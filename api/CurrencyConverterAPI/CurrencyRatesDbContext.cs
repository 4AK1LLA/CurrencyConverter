using CurrencyConverterAPI.Entity;
using Microsoft.EntityFrameworkCore;

namespace CurrencyConverterAPI
{
    public class CurrencyRatesDbContext : DbContext
    {
        public DbSet<Currency>? Currencies { get; set; }
        public DbSet<Rate>? Rates { get; set; }

        public CurrencyRatesDbContext(DbContextOptions options, ILogger<CurrencyRatesDbContext> logger) : base(options) {
            if (Database.EnsureCreated())
            {
                logger.LogInformation("Database was created since it did not exist");
            }
        }
    }
}
