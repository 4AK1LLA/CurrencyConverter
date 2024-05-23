namespace CurrencyConverterAPI.Entity
{
    public class Currency
    {
        public int CurrencyId { get; set; }
        public string? ShortName { get; set; }
        public string? DisplayName { get; set; }
        public string? Description { get; set; }
        public char Symbol { get; set; }
    }
}
