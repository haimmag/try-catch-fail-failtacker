using System.Data.Entity;
using Conduit.Mobile.ControlPanelV2.External.Domain;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Conduit.Mobile.ControlPanelV2.External.Data
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
		public ApplicationDbContext()
			: base("DefaultConnection")
		{
		}

		public DbSet<Issue> Issues { get; set; }
		public DbSet<LogAction> Logs { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			modelBuilder.Entity<ApplicationUser>()
				.HasMany(u => u.Assignments).WithRequired(i => i.AssignedTo);
			
			base.OnModelCreating(modelBuilder);
		}
	}
}