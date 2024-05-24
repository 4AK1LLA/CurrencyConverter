using CurrencyConverterAPI.Entity;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace CurrencyConverterAPI
{
    public static class Seeder
    {
        public static void Seed(this CurrencyRatesDbContext context, ILogger logger)
        {
            var filePath = Path.Combine(AppContext.BaseDirectory, "seed-data.yml");
            if (!File.Exists(filePath))
            {
                logger.LogError("The seed-data.yml file was not found");
                return;
            }

            var deserializer = new DeserializerBuilder()
                .WithNamingConvention(HyphenatedNamingConvention.Instance)
                .Build();

            using (var reader = new StreamReader(filePath))
            {
                YamlModel yaml = deserializer.Deserialize<YamlModel>(reader);

                foreach (var currency in yaml.Currencies)
                {
                    context.Currencies!.Add(new Currency
                    {
                        Code = currency.Key,
                        DisplayName = currency.Value.DisplayName,
                        Description = currency.Value.Description,
                        Symbol = currency.Value.Symbol
                    });
                }
            }

            context.SaveChanges();
        }
    }

#nullable disable
    public class YamlModel
    {
        public Dictionary<string, CurrencyDetail> Currencies { get; set; }

        public class CurrencyDetail
        {
            public string DisplayName { get; set; }
            public string Description { get; set; }
            public char Symbol { get; set; }
        }
    }
}
