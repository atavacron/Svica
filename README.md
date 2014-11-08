Svica
=====

http://svica.markets.com.s3-website-us-west-2.amazonaws.com/


FX Arbitrage


This uses the bellman-ford algo. to identify instances for arbitrage amongst 18 of the most liquid currencies. 
The cross-rates are queried via YQL and the shortest path is found using an edited networkx script that does not terminate on negative cycles.

Svica v1.1.2

-This project is no longer live.
-Fixed issue with Yahoo Pipes!RSS Feeds now work.
-CSS now reflects the static website on S3.
-The site is now strictly a client-side skeleton site. All live assets, except for the RSS feeds, are no longer functioning.

Svica v1.1.1

-Charts and indices are now created upon running of main script via
import.

-Removed whitespace and renamed directory “D3 data” to “D3_data”.

-Default index for Korea is now the KOSPI instead of MSCI ETF. This
eliminates the lag between the main index and the respective VIX.

-Hang Seng VIX(VHSI) is now current.
