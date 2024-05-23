using CurrencyConverterAPI.Entity;

namespace CurrencyConverterAPI
{
    public class CurencyRatesService
    {
        private readonly CurrencyRatesDbContext _context;

        public CurencyRatesService(CurrencyRatesDbContext context)
        {
            _context = context;
        }

        public IList<Currency> getAllCurrencies()
        {
            return _context.Currencies!.ToList();
        }
    }
}
