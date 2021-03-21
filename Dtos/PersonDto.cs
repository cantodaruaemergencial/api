using System;

namespace api.Dtos
{
    public class PersonDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SocialName { get; set; }
        public DateTime Birthdate { get; set; }
        public string MotherName { get; set; }
        public string BirthPlace { get; set; }
        public string SkinColor { get; set; }
        public string Gender { get; set; }
        public int Childrens { get; set; }
        public bool HasBabitation { get; set; }
        public string HomelessTime { get; set; }
        public bool EmergencyAid { get; set; }
        public bool PbhBasket { get; set; }
        public bool UniqueRegister { get; set; }
        public bool HasGeneralRegister { get; set; }
        public string general_register { get; set; }
        public bool HasCpf { get; set; }
        public string Cpf { get; set; }
        public bool HasCtps { get; set; }
        public bool HasBirthCertificate { get; set; }
        public string MaritalStatus { get; set; }
        public string SchoolTraining { get; set; }
        public string ReferenceLocation { get; set; }
        public string Occupation { get; set; }
        public string Profession { get; set; }
        public string ContactPhone { get; set; }
        public string ReferenceAddress { get; set; }
        public string Demands { get; set; }
        public string Observation { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}