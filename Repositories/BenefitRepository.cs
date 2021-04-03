using api.Dtos;
using api.Interfaces;
using System.Collections.Generic;

namespace api.Repositories
{
    public class BenefitRepository : BaseRepository, IBenefitRepository
    {
        public IEnumerable<BenefitDto> Get() => Query<BenefitDto>(@"
            SELECT id as Id, benefit as Benefit
            FROM benefit
            ORDER BY benefit");
    }
}