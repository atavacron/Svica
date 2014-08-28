import math
import sys
import urllib2
import json
import networkx as nx
import re
import ind
import vol


print "Here we go..."
print " "
print " "
print " "
print " "
# Inserts new (USD_r[N])node every iteration
def iterate(N,url):
    r=["C%22AEDUSD%22", "C%22EURUSD%22", "C%22JPYUSD%22", "C%22CNYUSD%22", "C%22GBPUSD%22", "C%22CADUSD%22", "C%22KRWUSD%22", "C%22AUDUSD%22", "C%22NZDUSD%22", "C%22CHFUSD%22", "C%22NOKUSD%22", "C%22SEKUSD%22", "C%22SGDUSD%22", "C%22HKDUSD%22", "C%22CNYUSD%22", "C%22INRUSD%22", "C%22RUBUSD%22", "C%22MXNUSD%22", "C%22TRYUSD%22", "C%22AEDUSD%22","C%22BRLUSD%22"]
    N=N

    for x in range(0,20):
        url_2 ="https://query.yahooapis.com/v1/public/yql?q=select%20Name%2C%20Rate%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDUSD%22%2C%22USDAED%22%2C%22USDAUD%22%2C%22USDBRL%22%2C%22USDCAD%22%2C%22USDCHF%22%2C%22USDCNY%22%2C%22USDCNH%22%2C%22USDEUR%22%2C%22USDGBP%22%2C%22USDCNH%22%2C%22USDHKD%22%2C%22USDCNH%22%2C%22USDINR%22%2C%22USDJPY%22%2C%22USDKRW%22%2C%22USDMXN%22%2C%22USDNOK%22%2C%22USDNZD%22%2C%22USDRUB%22%2C%22USDSEK%22%2C%22USDSGD%22%2C%22USDTRY%22%2C%22USDZAR%22%2C%22AEDAED%22%2C%22AEDAUD%22%2C%22AEDCAD%22%2C%22AEDCHF%22%2C%22AEDCNY%22%2C%22AEDEUR%22%2C%22AEDGBP%22%2C%22AEDINR%22%2C%22AEDJPY%22%2C%22AEDNOK%22%2C%22AEDNZD%22%2C%22AUDCHF%22%2C%22AUDCNY%22%2C%22AUDGBP%22%2C%22AUDJPY%22%2C%22AUDMXN%22%2C%22AUDNZD%22%2C%22AUDRUB%22%2C%22AUDSEK%22%2C%22BRLEUR%22%2C%22BRLGBP%22%2C%22BRLJPY%22%2C%22BRLMXN%22%2C%22BRLRUB%22%2C%22CADAED%22%2C%22CADAUD%22%2C%22CADCAD%22%2C%22CADCHF%22%2C%22CADCNY%22%2C%22CADEUR%22%2C%22CADGBP%22%2C%22CADINR%22%2C%22CADJPY%22%2C%22CADKRW%22%2C%22CADMXN%22%2C%22CADNOK%22%2C%22CADNZD%22%2C%22CADSGD%22%2C%22CHFAED%22%2C%22CHFAUD%22%2C%22CHFBRL%22%2C%22CHFCAD%22%2C%22CHFCHF%22%2C%22CHFCNY%22%2C%22CHFEUR%22%2C%22CHFGBP%22%2C%22CHFINR%22%2C%22CHFJPY%22%2C%22CHFKRW%22%2C%22CHFMXN%22%2C%22CHFNOK%22%2C%22CHFNZD%22%2C%22CHFSEK%22%2C%22CHFTRY%22%2C%22CHFTWD%22%2C%22CNHNZD%22%2C%0A%22CNHEUR%22%2C%0A%22CNHTRY%22%2C%0A%22CNHBRL%22%2C%0A%22CNHCHF%22%2C%0A%22CNHAUD%22%2C%0A%22CNHMXN%22%2C%0A%22CNHRUB%22%2C%0A%22CNHGBP%22%2C%0A%22CNHSEK%22%2C%0A%22CNHNOK%22%2C%0A%22CNHZAR%22%2C%0A%22CNHSGD%22%2C%0A%22CNHCAD%22%2C%0A%22CNHINR%22%2C%0A%22CNHJPY%22%2C%0A%22CNHKRW%22%2C%22CHFZAR%22%2C%22CNYAED%22%2C%22CNYAUD%22%2C%22CNYBRL%22%2C%22CNYCAD%22%2C%22CNYCHF%22%2C%22CNYCNY%22%2C%22CNYEUR%22%2C%22CNYGBP%22%2C%22CNYINR%22%2C%22CNYJPY%22%2C%22CNYMXN%22%2C%22CNYNOK%22%2C%22CNYNZD%22%2C%22CNYSEK%22%2C%22CNYTRY%22%2C%22CNHCNY%22%2C%22KRWEUR%22%2C%22EURAED%22%2C%22EURAUD%22%2C%22EURCAD%22%2C%22EURCHF%22%2C%22EURCNY%22%2C%22EUREUR%22%2C%22EURGBP%22%2C%22EURHKD%22%2C%22EURINR%22%2C%22EURJPY%22%2C%22EURMXN%22%2C%22EURNOK%22%2C%22EURNZD%22%2C%22EURRUB%22%2C%22EURSGD%22%2C%22EURTRY%22%2C%22GBPAED%22%2C%22GBPAUD%22%2C%22GBPCAD%22%2C%22GBPCHF%22%2C%22GBPCNY%22%2C%22GBPEUR%22%2C%22GBPGBP%22%2C%22GBPHKD%22%2C%22GBPINR%22%2C%22GBPJPY%22%2C%22GBPKRW%22%2C%22GBPMXN%22%2C%22GBPNOK%22%2C%22GBPNZD%22%2C%22GBPRUB%22%2C%22GBPSEK%22%2C%22GBPSGD%22%2C%22GBPTRY%22%2C%22HKDAUD%22%2C%22HKDCHF%22%2C%22HKDEUR%22%2C%22HKDGBP%22%2C%22CNHCHF%22%2C%22CNHCNY%22%2C%22INRAED%22%2C%22INRAUD%22%2C%22INRCAD%22%2C%22INRCHF%22%2C%22INRCNY%22%2C%22INREUR%22%2C%22INRGBP%22%2C%22INRHKD%22%2C%22INRINR%22%2C%22INRJPY%22%2C%22INRKRW%22%2C%22INRNOK%22%2C%22INRNZD%22%2C%22INRRUB%22%2C%22INRSEK%22%2C%22INRSGD%22%2C%22INRZAR%22%2C%22JPYAED%22%2C%22JPYAUD%22%2C%22JPYCAD%22%2C%22JPYCHF%22%2C%22JPYCNY%22%2C%22JPYEUR%22%2C%22JPYGBP%22%2C%22JPYINR%22%2C%22JPYJPY%22%2C%22JPYMXN%22%2C%22JPYNOK%22%2C%22JPYNZD%22%2C%22JPYRUB%22%2C%22JPYTRY%22%2C%22MXNCAD%22%2C%22MXNCHF%22%2C%22MXNCNY%22%2C%22MXNEUR%22%2C%22MXNGBP%22%2C%22MXNINR%22%2C%22MXNJPY%22%2C%22MXNNZD%22%2C%22MXNRUB%22%2C%22MXNSGD%22%2C%22NOKAED%22%2C%22NOKAUD%22%2C%22NOKCAD%22%2C%22NOKCHF%22%2C%22NOKCNY%22%2C%22NOKEUR%22%2C%22NOKGBP%22%2C%22NOKGYD%22%2C%22NOKINR%22%2C%22NOKJPY%22%2C%22NOKMXN%22%2C%22NOKNOK%22%2C%22NOKNZD%22%2C%22NOKRUB%22%2C%22NOKSEK%22%2C%22NZDAUD%22%2C%22NZDCHF%22%2C%22NZDCNY%22%2C%22NZDTRY%22%2C%22NZDEUR%22%2C%22NZDINR%22%2C%22NZDJPY%22%2C%22NZDMXN%22%2C%22NZDNOK%22%2C%22NZDRUB%22%2C%22RUBAUD%22%2C%22RUBCHF%22%2C%22RUBEUR%22%2C%22RUBCNY%22%2C%22RUBINR%22%2C%22RUBMXN%22%2C%22RUBNZD%22%2C%22SEKCHF%22%2C%22SEKCNY%22%2C%22SEKEUR%22%2C%22SEKHKD%22%2C%22SEKINR%22%2C%22SEKJPY%22%2C%22SGDCHF%22%2C%22SGDEUR%22%2C%22SGDCNY%22%2C%22SGDMXN%22%2C%22SGDRUB%22%2C%22TRYAED%22%2C%22TRYCHF%22%2C%22TRYEUR%22%2C%22TRYCNY%22%2C%22TRYJPY%22%2C%22TRYRUB%22%2C%22TWDCHF%22%2C%22TWDCNY%22%2C%22ZARCHF%22%2C%22ZAREUR%22%2C%22ZARRUB%22%2C%22AEDUSD%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
        to_usd=r[N]
        bebe=(N-N)
        match=str(r[bebe])
        replace=str(to_usd)
        sourceCaseMatch = re.findall(match,url_2)[0]
        url = url_2.replace(sourceCaseMatch, replace)
    return url
# Parses, modifies and serializes json data for Networkx
def yql(url):
    rates = urllib2.urlopen(url, data="None" ).read()
    y=json.loads(rates)
    r = y
    q = y['query']['results']['rate']
    q = dict(((x['Name'].replace(" to ", "_")), x['Rate']) for x in q)
    with open('rates_3.json',"w") as z:
        m=json.dump(q,z)
# Reads the json
def query(z):
    r_r=open("rates_3.json").read()
    r_r=json.loads(r_r)
    return r_r
# Creates the graph and adds the edge weights for BF algo
def NX_g(node_pnts):
    nxdg = nx.DiGraph()
    nxdg.add_weighted_edges_from(node_pnts)
    return nxdg
# Runs Bellman-Ford algo. Note this uses a modified Networkx Weighted Graph script that returns the negative cycle.
def svica(digraph, firstFX="USD",weight='weight'):
    P = nx.bellman_ford(digraph, firstFX,weight='weight', return_negative_cycle=True)
    return P
# Adds the rates to the respective node for later computation
def pnode(rates):
    rlist = rates[0].split("_")
    return (rlist[0], rlist[1], -1.0 * math.log(float(rates[1])))
#Computes the best path of fx swaps
def work(N,P, g, firstFX="USD",weight='weight'):
    touched = set(firstFX)
    net_g=1
    s=0
    pred = P[0][firstFX]
    r = firstFX
    T_Mnt=1000000000
    netp=0
    print N
    pth=[]
    #pred "returns two dictionaries keyed by node to predecessor in the path and to the distance from the source respectively"
    while pred not in touched:
        s+=1
        print s,". ", pred, "        ", r, math.exp(-g[pred][r]['weight'])
        pth.append(r)
        pth.append(pred)
        net_g=net_g*(math.exp(-g[pred][r]['weight']))
        touched.add(pred)
        r = pred
        pred = P[0][pred]
     
    net_g =net_g*(math.exp(-g[firstFX][r]['weight']))
    netp= ((net_g-1))
    s+=1
    print s,". ",firstFX, "         ", r, math.exp(-g[firstFX][r]['weight'])
    pth.append(r)
    pth.append(firstFX)
    pred = P[0][pred]
    netp=netp
    
    pth=pth[::-1]
    return netp, pth
# Calls the previos functions 21 times and dumps the information.
def controller(work,pnode,svica,NX_g,yql,iterate,query):
    mydic={}
    mylst=[]
    netdic={}
    N=0
    r=["AED", "EUR", "JPY", "CNY", "GBP", "CAD", "KRW", "AUD", "NZD", "CHF", "NOK", "SEK", "SGD", "HKD", "CNY", "INR", "RUB", "MXN", "TRY", "AED","BRL"]

    for x in range(0,20):
        N+=1
        url=iterate(N,url="")
        fir=yql(url)
        json = query(fir)
        node_pnts = map(pnode, json.items())
        nxdg = NX_g(node_pnts)
        P = svica(nxdg)
        A=work(N,P, nxdg)
        net_p=float(A[0])
        V=r[N]
        mylst.append(net_p)
        netdic[N]=net_p
        netdic[V] = netdic.pop(N)
        L=A[1]
        mydic[N]=L
        mydic[V] = mydic.pop(N)
        
    else:
        minval=min(mylst)
        whr=mylst.index(minval)
        whr+=1
        pos=r[whr]
        N=(whr)
        url=iterate(N,url="")
        fir=yql(url)
        json = query(fir)
        node_pnts = map(pnode, json.items())
        nxdg = NX_g(node_pnts)
        P = svica(nxdg)
        A=work(N,P, nxdg)

    return mydic, netdic
# Serializes and dumps the info as needed.
def index(controller): 
    c=controller(work,pnode,svica,NX_g,yql,iterate,query)
    spath=c[0]
    sperc=c[1]

    with open('path.json','w') as p:
        x=json.dump(spath,p)
    return 
    


    
index(controller)


