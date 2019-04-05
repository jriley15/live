using Microsoft.EntityFrameworkCore.Migrations;

namespace Live.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Streams_UserId",
                table: "Streams");

            migrationBuilder.RenameColumn(
                name: "UserStreamId",
                table: "Streams",
                newName: "StreamId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Streams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Streams",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Streams_UserId",
                table: "Streams",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Streams_UserId",
                table: "Streams");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Streams");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Streams");

            migrationBuilder.RenameColumn(
                name: "StreamId",
                table: "Streams",
                newName: "UserStreamId");

            migrationBuilder.CreateIndex(
                name: "IX_Streams_UserId",
                table: "Streams",
                column: "UserId");
        }
    }
}
