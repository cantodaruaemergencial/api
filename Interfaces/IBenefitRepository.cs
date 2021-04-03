using api.Dtos;
using System.Collections.Generic;

namespace api.Interfaces
{
    public interface IBenefitRepository
    {
        IEnumerable<BenefitDto> Get();
    }
}