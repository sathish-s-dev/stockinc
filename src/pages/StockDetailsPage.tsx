import StockHistorySelection from "@/components/home/StockHistorySelection";
import ApexChart from "@/components/ui/ApexChart";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  addToWatchlist,
  removeStockFromWatchlist,
} from "@/features/watchlistSlice";
import { cn } from "@/lib/utils/cn";
import type { RootState } from "@/store/store";
import { useState } from "react";
import { Check, Plus, X } from "react-feather";
// import toast from "react-hot-toast";
import { useGetStockQuoteQuery } from "@/services/mockStockApi";
import type { Duration, Stock } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { BackButton } from "@/components/BackButton";

const StockDetails = () => {
  const dispatch = useDispatch();

  const watchlist = useSelector(
    (state: RootState) => state.watchlist.watchlistState
  );

  const [chartDuration, setChartDuration] = useState<Duration>({
    key: "1M",
    value: 30,
  });

  console.log(watchlist, "watchlist");

  const params = useParams<{ symbol?: string }>();

  console.log(params?.symbol);

  // const [singleStockQuote] = stockQuote;

  const { data } = useGetStockQuoteQuery(params?.symbol || "AAPL");

  console.log(data, "stock details page data");

  if (!data) return null;

  const changePercentage = +data.change_percent.toFixed(2);

  const isINWatchlist = watchlist?.some(
    (stock) => stock.symbol === data.symbol
  );

  console.log(isINWatchlist, "stock is already in watchlist");

  // console.log(changePercentage < 0);

  // const priceRange = data.range.split("-");

  return (
    <div className="grid gap-4 p-4 px-8">
      <div className="flex gap-2 items-center">
        <div className="flex justify-between w-full gap-4 md:items-center flex-col md:flex-row">
          <div className="flex gap-2 items-center justify-center py-2">
            <BackButton />
            <img
              src={data.logo}
              alt="logo"
              className="w-14 p-1 invert dark:invert-0"
            />
            <div>
              <SectionHeading title={data.company} />
              <p
                className={cn("text-sm text-gray-700 dark:text-gray-100")}
                style={{
                  color: changePercentage > 0 ? "#22c55e" : "#ef4444 ",
                }}
              >
                {changePercentage < 0
                  ? changePercentage
                  : `+${changePercentage}`}
                %
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const details = dispatch(addToWatchlist(data));
                console.log(details);
              }}
              disabled={isINWatchlist}
              className={cn(
                "flex gap-1 items-center px-4 py-1 border bg-white text-gray-600 rounded-md text-sm",
                isINWatchlist ? "bg-green-500/50 text-white " : "bg-white"
              )}
            >
              {isINWatchlist ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Watchlist
            </button>
            {isINWatchlist ? (
              <button
                onClick={() => {
                  const details = dispatch(
                    removeStockFromWatchlist(data.symbol)
                  );
                  console.log(details);
                }}
                className="flex gap-1 items-center px-4 py-1 border border-red-500 bg-red-700 text-gray-100 rounded-md text-sm"
              >
                <X className="w-4 h-4" /> Remove
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <StockDetailsSection data={data} />
      <SectionHeading title="Chart" />
      <SectionWrapper>
        <StockHistorySelection
          chartDuration={chartDuration}
          setChartDuration={setChartDuration}
        />
        <ApexChart
          symbol="TSLA"
          chartDuration={chartDuration}
          setChartDuration={setChartDuration}
        />
      </SectionWrapper>
    </div>
  );
};

export default StockDetails;

function StockDetailsSection({ data }: { data: Stock }) {
  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between p-4">
        <div className="flex flex-col gap-2 text-gray-900 dark:text-gray-100">
          <p className="text-sm">Market Cap</p>
          <p className="text-xl"> ₹ {data.market_cap}</p>
          <p></p>
        </div>
        <div className="flex flex-col gap-2 text-gray-900 dark:text-gray-100">
          <p className="text-sm">Volueme</p>
          <p className="text-xl">₹ {data.volume}</p>
        </div>
        <div className="flex flex-col gap-2 text-gray-900 dark:text-gray-100">
          <p className="text-sm">Fully Dilutted Market Cap</p>
          <p className="text-xl"> ₹ {data.market_cap}</p>
        </div>
        <div className="flex flex-col gap-2 text-gray-900 dark:text-gray-100">
          <p className="text-sm">Market Price</p>
          <p className="text-xl"> ₹ {data.current_price}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
