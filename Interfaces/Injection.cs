using Microsoft.Extensions.DependencyInjection;
using api.Repositories;

namespace api.Interfaces
{
    public static class Injection
    {
        public static void InjectDependecies(this IServiceCollection services)
        {
            services.AddScoped<IBenefitRepository, BenefitRepository>();
        }
    }
}