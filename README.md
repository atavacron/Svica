svica
=====

fx arbitrage


This uses bellman-ford to identify instances for arbitrage amongst 18 of the most liquid currencies. 
The cross-rates are queried via YQL and the shortest path is found using an edited networkx script that does not terminate on negative cycles.
