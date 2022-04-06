namespace AuctionUtility
{
    public class Lot
    {
        public int lotNumber { get; set; }

        public string[] items { get; set; }

        public int itemsCount { get; set; }

        public double? finalBid { get; set; }

        public int? buyerNumber { get; set; }
    }
}
