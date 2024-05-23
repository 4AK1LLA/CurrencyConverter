namespace CurrencyConverterAPI.Entity
{
    public class Rate
    {
        public double RateToBase { get; set; }
        public DateTime Date { get; set; }
        public Currency? Currency { get; set; }
    }
}
