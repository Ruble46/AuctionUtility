using AuctionUtility;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

public class SimpleDataStorage: IdentityDbContext<AppUser, AppRole, string>
{
    public SimpleDataStorage(){}
 
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //Set the filename of the database to be created
        optionsBuilder.UseSqlite("Data Source=db.sqlite");
    }
 
    public DbSet<Bidder> Bidders => Set<Bidder>();

    public DbSet<Lot> Lots => Set<Lot>();

    public DbSet<Preferences> Preferences => Set<Preferences>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        //Define the Table(s) and References to be created automatically
        modelBuilder.Entity<Bidder>(b =>
        {
            b.HasKey(e => new {e.number, e.auctionYear});
            b.Property(e => e.name);
            b.Property(e => e.hasPaid);
            b.ToTable("Bidders");
        });

        modelBuilder.Entity<Lot>(b =>
        {
            b.HasKey(e => new {e.lotNumber, e.auctionYear});
            b.Property(e => e.items).HasConversion(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<string[]>(v));
            b.Property(e => e.finalBid);
            b.Property(e => e.buyerNumber);
            b.ToTable("Lots");
        });

        modelBuilder.Entity<Preferences>(b => 
        {
            b.HasKey(b => b.id);
            b.Property(b => b.selectedYear);
            b.ToTable("Preferences");
        });
    }
}