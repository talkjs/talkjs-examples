namespace TalkJsInBlazorWasm.Models.TalkJsModels
{
    public class User
    {
        public long Id { get; set; }
        public  string Name { get; set; }
        public string[] Email { get; set; }
        public string[] Phone { get; set; }
        public string PhotoUrl { get; set; }
        public string Locale { get; set; }
        public string WelcomeMessage { get; set; }
        public string Role { get; set; }
        public Dictionary<string, string> Custom { get; set; }
    }
}
