using CurrencyConverterAPI;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CurrencyRatesDbContext>(options =>
{
    bool useSql = builder.Configuration.GetValue<bool>("UseSql");
    if (useSql)
    {
        ///
    } 
    else
    {
        options.UseInMemoryDatabase("CurrencyConverter");
    }
});

builder.Services.AddScoped<CurrencyRatesService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/currencies", (CurrencyRatesService service) => service.GetAllCurrencies());

app.MapGet("/convert", (int fromId, int toId, double amount, CurrencyRatesService service) => service.Convert(fromId, toId, amount));

app.Run();