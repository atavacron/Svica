import csv
import time
import datetime
import json
import collections
import os
import Quandl


now = datetime.datetime.now()
start_time = time.clock()
# Key
# V--values containing [datetime,index value]
# cnt_vol_pairs--pairing of market index and volatility index.
# json_frmt--json format of json files of nv.d3 volatility graph
# p_2-- market index name with escaped characters
# P-- complete yql query
# t-- file name
# U-- object created from yql query
# cvr-- csv object created from U
# cvw-- csv  object to be written
# header-- headers of csv
# cs_op--function that makes the queries
# rus--function that can be used for problematic market queries or for indices that do not exist in tabled format or database.

# V=[]
cnt_ind = {'AUS': "AXJO", 'BRL': 'BVMF3.SA', 'CAN': 'GSPTSE', 'PRC': '000001.SS', 'EUR': 'STOXX50E', 'IND': 'BSESN',
           'JPN': 'N225', 'USA': 'GSPC', 'NOR': 'OBXP.OL', 'SWE': 'OMX', 'SWZ': 'SSMI', 'GBR': 'FTSE', 'UAE': 'UAE',
           'NZL': 'NZ50', 'SGP': 'STI', 'MEX': 'MXX', }
cnt_vol = {'AUS': "SPAVIX", 'BRL': 'BVMF3.SA', 'CAN': 'GSPTSE', 'PRC': '000001.SS', 'EUR': 'STOXX50E', 'IND': 'BSESN',
           'JPN': 'N225', 'USA': 'VIX', 'NOR': 'OBXP.OL', 'SWE': 'OMX', 'SWZ': 'SSMI', 'GBR': 'FTSE', 'UAE': 'UAE',
           'NZL': 'NZ50', 'SGP': 'STI', 'MEX': 'MXX', }
cnt_ind_U = {'AUS': "%5EAXJO", 'BRL': 'EWZ', 'CAN': '%5EGSPTSE', 'PRC': '000001.SS', 'EUR': '%5ESTOXX50E',
             'IND': '%5EBSESN', 'JPN': '%5EN225', 'USA': '%5EGSPC', 'NOR': 'OBXP.OL', 'SWE': '%5EOMX', 'SWZ': '%5ESSMI',
             'GBR': '%5EFTSE', 'UAE': 'UAE', 'NZL': '%5ENZ50', 'SGP': '%5ESTI', 'MEX': '%5EMXX', }
cnt_vol_U = {'AUS': "%5EAXJO", 'BRL': 'BVMF3.SA', 'CAN': '%5EGSPTSE', 'PRC': '000001.SS', 'EUR': '%5ESTOXX50E',
             'IND': '%5EBSESN', 'JPN': '%5EN225', 'USA': '%5EVIX', 'NOR': 'OBXP.OL', 'SWE': '%5EOMX', 'SWZ': '%5ESSMI',
             'GBR': '%5EFTSE', 'UAE': 'UAE', 'NZL': '%5ENZ50', 'SGP': '%5ESTI', 'MEX': '%5EMXX', }
cnt_csv_Q = {
"BRL": "CBOE/VXEWZ", "PRC": "ABMI/TRADING_VOLUME_CHN", "GBR": "FTSE/VFTSE", "RUS": "YAHOO/INDEX_RTS_RS",
"MEX": "OFDP/INDEX_MARKIT_CDXNAHVOL", "IND": "GOOG/NSE_INDIAVIX", "JPN": "CSFI/VXJ", "NOR": "QUANDL/EURNOK",
"EUR": "OFDP/INDEX_MARKIT_ITRXEU", "SWE": "EUROSTAT/TEIMF040_12", "SGP": "PSYCH/EWS_I", "SWZ": "VSMI",
"UAE": "CBOE/VXEEM", "HKG": "HSVI", "NZL": "QUANDL/NZDUSD", "TUR": "CBOE/VXEEM", "USA": "OFDP/INDEX_MARKIT_CDXNAHYHVOL",

}


def init():
    cnt = [
        "KOR",
        "CAN",
        "PRC",
        "BRL",
        "AUS",
        "RUS",
        "MEX",
        "IND",
        "JPN",
        "NOR",
        "EUR",
        "SWE",
        "SGP", 
        "NZL",
        "TUR",
        "USA",
        # 'GBR',
        # "SWZ",
        # "UAE", 
        # "HKG",
    ]
    token= raw_input("Please enter your Quandl Authentification token: ")
    for i in cnt:
        print i
        i = [i]
        v = quan(i,token)
        json_pop(v)
        print time.clock() - start_time, "seconds"

    
    # cnt.append(str(c))
    # timeform(cnt)
    return cnt,token


def quan(cnt,token):
    c = cnt_v()
    cty = []
    cty.extend(cnt)
    s_x = []
    s_v = []
    cnt_vquan = c[0]
    cnt_squan = c[1]
    col_vquan = c[2]
    col_squan = c[3]
    cur = str(now.year) + '-' + str(now.month) + '-' + str(now.day)
    print cur
    root="js/D3_data/Volatility/"
    for k in range(0, len(cnt)):
        c = cnt[k]
        v = root+c + "_vol_I.csv"
        v2 = root+c + "_vol_II.csv"
        x = root+c + "_std_I.csv"
        x2 = root+c + "_std_II.csv"

        vol = cnt_vquan[c]
        std = cnt_squan[c]

        col_v = int(col_vquan[c])
        col_s = int(col_squan[c])


        Q = (Quandl.get(vol, exclude_headers=True, trim_start="2013-12-23", trim_end=cur, column=col_v,
                        authtoken=token)).to_csv(v)
        J = (Quandl.get(std, exclude_headers=True, trim_start="2013-12-23", trim_end=cur, column=col_s,
                        authtoken=token)).to_csv(x)

        U_v = open(v, 'rw')
        U_v2 = open(v2, "wb")

        cvr = csv.reader(U_v)
        cvw = csv.writer(U_v2)
        U_x = open(x)
        U_x2 = open(x2, "wb")

        cvr_x = csv.reader(U_x)
        cvw_x = csv.writer(U_x2)
        cvr_2 = csv.reader(U_v)
        cvw_2 = csv.writer(U_v2)

        # if GBR-			date = time.strptime(row[0], '%m/%d/%y')

        for row in cvr:
            date = time.strptime(row[0], '%Y-%m-%d')
            row[0] = (time.mktime(date) - time.timezone) * 1000
            row[0] = float(row[0])
            row[1] = float(row[1])
            s_v.append(row)
            cvw.writerow(row)

        for row in cvr_x:
            date = time.strptime(row[0], '%Y-%m-%d')
            row[0] = (time.mktime(date) - time.timezone) * 1000
            row[0] = float(row[0])
            row[1] = float(row[1])
            s_x.append(row)
            cvw_x.writerow(row)
        U_x.close()
        U_x2.close()
        U_v.close()
        U_v2.close()
        values = [s_x, s_v, cty, cnt_vquan, cnt_squan, col_vquan, col_squan]
        return values


def cnt_v():
    cnt_vquan = {"AUS": "SPDJ/SPAVIX", "CAN": "YAHOO/TSX_VIXC_TO", "KOR": "YAHOO/INDEX_VIX",
                 "BRL": "CBOE/VXEWZ", "PRC": "CBOE/VXFXI", "GBR": "ENX/VFTSE", "RUS": "YAHOO/INDEX_RTS_RS",
                 "MEX": "OFDP/INDEX_MARKIT_CDXNAHVOL", "IND": "GOOG/NSE_INDIAVIX", "JPN": "CSFI/VXJ",
                 "NOR": "QUANDL/EURNOK", "EUR": "OFDP/INDEX_MARKIT_ITRXEU", "SWE": "EUROSTAT/TEIMF040_12",
                 "SGP": "PSYCH/EWS_I", "SWZ": "VSMI", "UAE": "CBOE/VXEEM", "HKG": "HSVI", "NZL": "QUANDL/NZDUSD",
                 "TUR": "CBOE/VXEEM", "USA": "OFDP/INDEX_MARKIT_CDXNAHYHVOL",
    }
    cnt_squan = {"KOR": "YAHOO/INDEX_KS11",
                 "AUS": "YAHOO/INDEX_AXJO", "BRL": "NASDAQOMX/NQBR", "CAN": "YAHOO/INDEX_GSPTSE",
                 "PRC": "NASDAQOMX/NQCN", "GBR": "GOOG/EPA_UKX", "RUS": "NASDAQOMX/NQRU", "MEX": "NASDAQOMX/NQMX",
                 "IND": "NASDAQOMX/NQIN", "JPN": "YAHOO/INDEX_JPN", "NOR": "NASDAQOMX/NQNO", "EUR": "NASDAQOMX/NQEU",
                 "SWE": "NASDAQOMX/NQSEEUR", "SGP": "NASDAQOMX/NQSG", "SWZ": "YAHOO/INDEX_SSMI", "UAE": "GOOG/FRA_D9O",
                 "HKG": "GOOG/NSE_HNGSNGBEES", "NZL": "NASDAQOMX/NQNZ", "TUR": "NASDAQOMX/NQTR",
                 "USA": "OFDP/INDEX_MARKIT_CDXNAIG",
    }
    col_vquan = {
    "KOR": 4,
    "CAN": 4,
    "AUS": 1,
    "BRL": 4,
    "PRC": 4,
    "GBR": 4,
    "RUS": 4,
    "MEX": 1,
    "IND": 4,
    "JPN": 1,
    "NOR": 1,
    "EUR": 1,
    "SWE": 1,
    "SGP": 1,
    "SWZ": 1,
    "UAE": 4,
    "HKG": 1,
    "NZL": 1,
    "TUR": 4,
    "USA": 1,

    }
    col_squan = {
    "KOR": 4,
    "CAN": 4,
    "AUS": 4,
    "BRL": 1,
    "PRC": 1,
    "GBR": 1,
    "RUS": 1,
    "MEX": 1,
    "IND": 1,
    "JPN": 4,
    "NOR": 1,
    "EUR": 1,
    "SWE": 1,
    "SGP": 1,
    "SWZ": 4,
    "UAE": 1,
    "HKG": 4,
    "NZL": 4,
    "TUR": 1,
    "USA": 1,


    }
    return cnt_vquan, cnt_squan, col_vquan, col_squan

def json_pop(values):
    s_x = values[0]
    s_v = values[1]
    cnt = values[2]
    cnt_vquan = values[3]
    cnt_squan = values[4]
    col_vquan = values[5]
    col_squan = values[6]
    root="js/D3_data/Volatility/"
    for k in range(0, len(cnt)):
        nm = cnt[k]
        vol = cnt_vquan[nm]
        std = cnt_squan[nm]

       

        y = collections.OrderedDict([("key", vol), ("color", "#ff0000"), ("values", s_v)])
        j = collections.OrderedDict([("key", std), ("bar", True), ("color", "#000"), ("values", s_x)])
        U = root+nm + "_vol" + ".json"
        with open(U, 'wb') as jsonfile:
            i = [j, y]
            r = json.dumps(i, jsonfile, sort_keys=True, indent=None)
            jsonfile.write(r)
            jsonfile.close()

        
    return






def timeform(cnt):
    s_x = []
    s_v = []
    num = 0
    root="js/D3_data/Volatility/"

    for k in range(0, len(cnt)):
        num += 1
        c = cnt[k]
        v = root + c + "_vol_I.csv"
        v2 = root + c + "_vol_II.csv"
        x = root + c + "_std_I.csv"
        x2 = root + c + "_std_II.csv"

        U_v = open(v, 'r')
        U_v2 = open(v2, "wb")

        cvr = csv.reader(U_v)
        cvw = csv.writer(U_v2)

        for row in cvr:
            date = time.strptime(row[0], '%d %b %y')
            row[0] = (time.mktime(date) - time.timezone) * 1000
            row[0] = float(row[0])
            row[1] = float(row[1])
            s_v.append(row)
            cvw.writerow(row)
        U_v.close()
        U_v2.close()

        U_x = open(x)
        U_x2 = open(x2, "wb")

        cvr_x = csv.reader(U_x)
        cvw_x = csv.writer(U_x2)

        for row in cvr_x:
            date = time.strptime(row[0], '%Y-%m-%d')
            row[0] = (time.mktime(date) - time.timezone) * 1000
            row[0] = float(row[0])
            row[1] = float(row[1])
            s_x.append(row)
            cvw_x.writerow(row)
        U_x.close()
        U_x2.close()

        x = [s_x, s_v]
        print num

        json_pop(x)
    return

init()
