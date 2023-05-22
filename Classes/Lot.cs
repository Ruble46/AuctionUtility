namespace AuctionUtility
{
    public class Lot
    {
        public int lotNumber { get; set; } = 0;

        public string[]? items { get; set; } = new string[0];

        public double? finalBid { get; set; }

        public int? buyerNumber { get; set; }
    }
}
