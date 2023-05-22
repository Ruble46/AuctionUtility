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
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
 
        //Define the Table(s) and References to be created automatically
        modelBuilder.Entity<Bidder>(b =>
        {
            b.HasKey(e => e.number);
            b.Property(e => e.name);
            b.Property(e => e.hasPaid); 
            b.ToTable("Bidders");
        });

        modelBuilder.Entity<Lot>(b =>
        {
            b.HasKey(e => e.lotNumber);
            b.Property(e => e.items).HasConversion(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<string[]>(v));
            b.Property(e => e.finalBid);
            b.Property(e => e.buyerNumber);
            b.ToTable("Lots");
        });
    }
}