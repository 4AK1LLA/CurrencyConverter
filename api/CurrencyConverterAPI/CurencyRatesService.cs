using CurrencyConverterAPI.Entity;

namespace CurrencyConverterAPI
{
    public class CurencyRatesService
    {
        private readonly CurrencyRatesDbContext _context;
        private readonly ILogger<CurencyRatesService> _logger;

        public CurencyRatesService(CurrencyRatesDbContext context, ILogger<CurencyRatesService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public double Convert(int fromId, int toId, double amount)
        {
            Currency from = _context.Currencies.Find(fromId);
            Currency to = _context.Currencies.Find(toId);

            return Convert(from, to, amount);
        }

        public double Convert(Currency from, Currency to, double amount)
        {
            if (from == null || to == null)
            {
                throw new ArgumentNullException("Both 'from' and 'to' currencies must be provided");
            }

            if (amount < 0)
            {
                throw new ArgumentException("Amount must be a positive number");
            }

            double fromRate = GetLatestRate(from);
            double toRate = GetLatestRate(to);

            return amount / toRate * fromRate;
        }

        public double GetLatestRate(Currency currency)
        {
            DateTime maxDate = _context.Rates
                .Where(rate => rate.Currency.CurrencyId == currency.CurrencyId)
                .Max(rate => rate.Date);

            Rate rate = _context.Rates
                .FirstOrDefault(rate => rate.Date == maxDate && rate.Currency.CurrencyId == currency.CurrencyId);

            if (rate == null)
            {
                throw new Exception($"Latest rate not found for currency {currency.Code}");
            }

            return rate.RateToBase;
        }

        public IList<Currency> GetAllCurrencies()
        {
            return _context.Currencies!.ToList();
        }
    }
}
