using System;

using Microsoft.Extensions.Logging;

namespace Kingsmen.CoreServices.Interfaces
{
    public interface ILoggingService
    {
        void LogCritical(string message, params object[] args);
        void LogDebug(string message, params object[] args);
        void LogError(Exception ex, params object[] args);
        void LogError(Exception ex, string message, params object[] args);
        void LogError(string message, params object[] args);
        void LogInformation(string message, params object[] args);
        void LogTrace(string message, params object[] args);
        void LogWarning(string message, params object[] args);
        void LogWarning(Exception ex, string message, params object[] args);

        void SetLogger(ILogger logger);
    }
}
