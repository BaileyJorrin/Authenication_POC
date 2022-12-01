using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using Kingsbook.Domain.Entities;
using Kingsbook.Infrastructure.Interfaces.DataServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Sgbj.Cron;

namespace Kingsbook.WebApi.Services
{
    public sealed class FetchImportHistoryLogConfigurations : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ImportScheduler> _logger;
        private readonly ImportScheduler _importScheduler;
        private readonly IConfiguration _configuration;
        static readonly HttpClient httpClient = new HttpClient();

        public FetchImportHistoryLogConfigurations(IServiceProvider serviceProvider, ILogger<ImportScheduler> logger, IConfiguration configuration, ImportScheduler importScheduler) => 
            (_serviceProvider, _logger, _configuration, _importScheduler) = (
            serviceProvider,
            logger,
            configuration,
            _importScheduler = importScheduler);

        protected override async System.Threading.Tasks.Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await CheckConfigurationItems();

            //using var scheduleSettingsTimer = new CronTimer("*/15 * * * *", TimeZoneInfo.Local);
            using var scheduleSettingsTimer = new CronTimer("* * * * *", TimeZoneInfo.Local);

            _logger.LogInformation(
            $"{nameof(FetchImportHistoryLogConfigurations)} is running.");

        }

        public async System.Threading.Tasks.Task WaitForConfigurationItems(CronTimer scheduleSettingsTimer, CancellationToken stoppingToken)
        {
            while (await scheduleSettingsTimer.WaitForNextTickAsync(stoppingToken))
            {
                await CheckConfigurationItems();
            }
        }

        private async System.Threading.Tasks.Task CheckConfigurationItems()
        {
            using (IServiceScope scope = _serviceProvider.CreateScope())
            {
                IConfigurationItemDataService configurationItemDataService =
                    scope.ServiceProvider.GetRequiredService<IConfigurationItemDataService>();

                List<ConfigurationItem> configurationItems = (List<ConfigurationItem>)await configurationItemDataService.GetGlobalFileImportSchedulerConfigurationItems();

                await SetImportScheduleConfiguration(configurationItems);

            }
        }

        private async System.Threading.Tasks.Task SetImportScheduleConfiguration(List<ConfigurationItem> configurationItems)
        {
            try
            {
                _importScheduler.isEnabled = bool.Parse(configurationItems[0].ItemValue);
                _importScheduler.hourToRun = int.Parse(configurationItems[1].ItemValue);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
            }
            return;
        }
    }
}