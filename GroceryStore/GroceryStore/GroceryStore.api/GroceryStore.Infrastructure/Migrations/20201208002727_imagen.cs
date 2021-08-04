using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceryStore.Infrastructure.Migrations
{
    public partial class imagen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Warehouse",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Warehouse");
        }
    }
}
