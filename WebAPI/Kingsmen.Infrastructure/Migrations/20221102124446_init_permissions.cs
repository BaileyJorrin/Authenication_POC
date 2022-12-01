using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kingsmen.Infrastructure.Migrations
{
    public partial class init_permissions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("insert into ControlPoint (Id, [Name], FriendlyName, CreateDateTime, UpdateDateTime, isActive, isDeleted, CreateUser, UpdateUser)\nVALUES ('65a3ff10-7d71-4b13-8733-9cf68146d28f', 'MENU_Security_Admin', 'Security Menu',GETDATE(), GETDATE(), 1, 0, 'System', 'System');");
            migrationBuilder.Sql("insert into FunctionalAbility (Id, [Name], [Description], CreateDateTime, UpdateDateTime, IsActive, IsDeleted, CreateUser, UpdateUser)\nVALUES ('d65e8d3f-6155-4d22-96f3-fe2e1be0874b', 'Security Admin', 'Access to the Security Administration', GETDATE(), GETDATE(), 1, 0, 'System', 'System');");
            migrationBuilder.Sql("INSERT INTO FunctionalAbilityControlPoint (Id, [FunctionalAbility_Id], [ControlPoint_Id], [CanView], CanAddUpdate, CanDelete, CanExecute, [IsActive],IsDeleted, CreateUser, UpdateUser, CreateDateTime, UpdateDateTime)\n    VALUES ('063be40e-1b93-4c2d-8c2a-e3f180807758', 'd65e8d3f-6155-4d22-96f3-fe2e1be0874b','65a3ff10-7d71-4b13-8733-9cf68146d28f', 1, 0, 0, 0, 1,0, 'System', 'System', GETDATE(), GETDATE() );");
            migrationBuilder.Sql("INSERT INTO RoleFunctionalAbility ([Id], [Role_Id], [FunctionalAbility_Id]    ,[CreateDateTime]\n      ,[UpdateDateTime]\n      ,[IsActive]\n      ,[IsDeleted]\n      ,[CreateUser]\n      ,[UpdateUser])\nVALUES ('8eaf1739-e24e-42a5-92e0-e7f4c228deab', 'b1699120-d521-40cb-88bd-1cfaeb4ae3c8', 'd65e8d3f-6155-4d22-96f3-fe2e1be0874b', GETDATE(), GETDATE(), 1, 0, 'System', 'System');\n");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM RoleFunctionalAbility WHERE Id = '8eaf1739-e24e-42a5-92e0-e7f4c228deab'");
            migrationBuilder.Sql("DELETE FROM FunctionalAbilityControlPoint WHERE Id = '063be40e-1b93-4c2d-8c2a-e3f180807758'");
            migrationBuilder.Sql("DELETE FROM FunctionalAbility WHERE Id = 'd65e8d3f-6155-4d22-96f3-fe2e1be0874b'");
            migrationBuilder.Sql("DELETE FROM ControlPoint WHERE Id = '65a3ff10-7d71-4b13-8733-9cf68146d28f'");
        }
    }
}
