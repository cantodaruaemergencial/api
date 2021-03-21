using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{

    [ApiController]
    [Route("api")]
    public class MasterDataController : ControllerBase
    {
        [HttpGet]
        [Route("benefits")]
        public IEnumerable<BenefitDto> GetBenefits() => new List<BenefitDto> {
            new BenefitDto() {
                Id = 1,
                Benefit = "Bolsa Família"
            },
            new BenefitDto() {
                Id = 2,
                Benefit = "Bolsa Moradia"
            },
            new BenefitDto() {
                Id = 3,
                Benefit = "BPC"
            }
        };

        [HttpGet]
        [Route("externalservices")]
        public IEnumerable<ExternalServiceDto> GetExternalServices() => new List<ExternalServiceDto> {
            new ExternalServiceDto() {
                Id = 1,
                ExternalService = "Albergue"
            },
            new ExternalServiceDto() {
                Id = 2,
                ExternalService = "Abrigo"
            },
            new ExternalServiceDto() {
                Id = 3,
                ExternalService = "República"
            },
            new ExternalServiceDto() {
                Id = 4,
                ExternalService = "Centro POP"
            },
            new ExternalServiceDto() {
                Id = 5,
                ExternalService = "Pastotal de Rua"
            },
            new ExternalServiceDto() {
                Id = 6,
                ExternalService = "Serviço de abordagem Social"
            }
        };

        [HttpGet]
        [Route("genders")]
        public IEnumerable<GenderDto> GetGenders() => new List<GenderDto> {
            new GenderDto() {
                Id = 1,
                Gender = "Masculino"
            },
            new GenderDto() {
                Id = 2,
                Gender = "Feminino"
            },
            new GenderDto() {
                Id = 3,
                Gender = "Outros"
            },
        };

        [HttpGet]
        [Route("maritalstatus")]
        public IEnumerable<MaritalStatusDto> GetMaritalStatus() => new List<MaritalStatusDto> {
            new MaritalStatusDto() {
                Id = 1,
                MaritalStatus = "Solteiro"
            },
            new MaritalStatusDto() {
                Id = 2,
                MaritalStatus = "Casado"
            },
            new MaritalStatusDto() {
                Id = 3,
                MaritalStatus = "Viúvo"
            },
            new MaritalStatusDto() {
                Id = 4,
                MaritalStatus = "Divorciado"
            },
            new MaritalStatusDto() {
                Id = 5,
                MaritalStatus = "Separado"
            },
            new MaritalStatusDto() {
                Id = 6,
                MaritalStatus = "União estável"
            },
            new MaritalStatusDto() {
                Id = 7,
                MaritalStatus = "Amasiado"
            }
        };

        [HttpGet]
        [Route("schooltrainings")]
        public IEnumerable<SchoolTrainingDto> GetSchoolTraining() => new List<SchoolTrainingDto> {
            new SchoolTrainingDto() {
                Id = 1,
                SchoolTraining = "Analfabeto"
            },
            new SchoolTrainingDto() {
                Id = 2,
                SchoolTraining = "Assina o nome"
            },
            new SchoolTrainingDto() {
                Id = 3,
                SchoolTraining = "Fundamental incompleto"
            },
            new SchoolTrainingDto() {
                Id = 4,
                SchoolTraining = "Fundamental completo"
            },
            new SchoolTrainingDto() {
                Id = 5,
                SchoolTraining = "Ensino médio incompleto"
            },
            new SchoolTrainingDto() {
                Id = 6,
                SchoolTraining = "Ensino médio completo"
            },
            new SchoolTrainingDto() {
                Id = 7,
                SchoolTraining = "Superior incompleto"
            },
            new SchoolTrainingDto() {
                Id = 8,
                SchoolTraining = "Superior completo"
            }
        };
    }
}