using System;
using System.Collections.Generic;
using System.Linq;

using Kingsmen.CoreServices.Interfaces;

using Microsoft.Extensions.Logging;

namespace Kingsmen.CoreServices.Services
{
    public class LoggingService : ILoggingService
    {
        internal ILogger _logger;

        public LoggingService(ILogger<LoggingService> logger)
        {
            _logger = logger;
        }

        public void SetLogger(ILogger logger)
        {
            _logger = logger;
        }

        #region Create message/args

        internal string CreateMessage(string content)
        {
            if (content == null)
            {
                content = "";
            }

            return content;
        }

        internal object[] CreateArgs(List<object> args)
        {
            if (args == null)
            {
                args = new List<object>();
            }

            return args.ToArray();
        }

        #endregion Create message/args

        #region Log messages

        public void LogCritical(string message, params object[] args)
        {
            _logger.LogCritical(CreateMessage(message), CreateArgs(args.ToList()) ); 
        }

        public void LogDebug(string message, params object[] args)
        {
            _logger.LogDebug(message, args);
        }

        public void LogError(Exception ex, params object[] args)
        {
            _logger.LogError(ex, ex.Message, args);
        }

        public void LogError(Exception ex, string message, params object[] args)
        {
            _logger.LogError(ex, message, args);
        }

        public void LogError(string message, params object[] args)
        {
            _logger.LogError(message, args);
        }

        public void LogInformation(string message, params object[] args)
        {
            _logger.LogInformation(CreateMessage(message), CreateArgs(args.ToList()));
        }

        public void LogTrace(string message, params object[] args)
        {
            _logger.LogTrace(message, args);
        }

        public void LogWarning(string message, params object[] args)
        {
            _logger.LogWarning(message, args);
        }

        public void LogWarning(Exception ex, string message, params object[] args)
        {
            _logger.LogWarning(ex, message, args);
        }
        #endregion Log messages
    }
}
