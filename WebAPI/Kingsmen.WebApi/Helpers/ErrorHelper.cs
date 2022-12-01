namespace Kingsmen.WebApi.Helpers
{
    public static class ErrorHelper
    {
        public const string ControllerErrorMessage = "A server error occurred.";
        public const string RecordAlreadyExistsMessage = "A record already exists for this entity.";
        public const string RecordDoesNotExistMessage = "A record does not exist for this entity.";
        public const string TeamErrorMessage = "A server error occurred.";

        public static string BadRequestMessage(string specificMessage)
        {
            return string.Format("Invalid request : {0}", specificMessage);
        }
    }
}
