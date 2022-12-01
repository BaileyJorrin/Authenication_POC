using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kingsmen.Infrastructure.Migrations
{
    public partial class create_roles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO dbo.Role (ID, [Name], [Description], CreateDateTime, UpdateDateTime, IsActive,IsDeleted, CreateUser, UpdateUser)\nVALUES ('401009e1-7422-4fcb-bac9-556236e2ae2a', 'Users', 'General Users can view data', GETDATE(), GETDATE(), 1, 0, 'System','System')");
            migrationBuilder.Sql("INSERT INTO dbo.Role (ID, [Name], [Description], CreateDateTime, UpdateDateTime, IsActive,IsDeleted, CreateUser, UpdateUser)\nVALUES ('0da41291-6470-4ac1-b1c8-2dfdf330d791', 'Data Entry', 'Data Entry access to Clients', GETDATE(), GETDATE(), 1, 0, 'System','System')");
            migrationBuilder.Sql("INSERT INTO dbo.Role (ID, [Name], [Description], CreateDateTime, UpdateDateTime, IsActive,IsDeleted, CreateUser, UpdateUser)\nVALUES ('b1699120-d521-40cb-88bd-1cfaeb4ae3c8', 'Security Admin', 'Access to User, Role and Permission managment', GETDATE(), GETDATE(), 1, 0, 'System','System')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM dbo.Role WHERE Id in ('b1699120-d521-40cb-88bd-1cfaeb4ae3c8','0da41291-6470-4ac1-b1c8-2dfdf330d791','401009e1-7422-4fcb-bac9-556236e2ae2a')");
        }
    }
}
