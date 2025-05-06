namespace AuctionUtility
{
    public class Donation
    {
        public Guid id { get; set; } = new Guid();
        public double amount { get; set; } = 0;

        public int auctionYear {get; set; } = 0;
    }
}
