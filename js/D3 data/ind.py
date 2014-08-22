import csv
import urllib2
import datetime

now = datetime.datetime.now()
symb = ["%5EAXJO", "%5GSPTSE", ]
cnt_ind = {
    'AUS': '%5EAXJO',
    'BRL': '%5EBVSP',
    'CAN': '%5EGSPTSE',
    'PRC': '000001.SS',
    'EUR': '%5ESTOXX50E',
    'IND': '%5EBSESN',
    'JPN': '%5EN225',
    'USA': '%5EIXIC',
    'NOR': 'OBXP.OL',
    'SWE': '%5EOMX',
    'SWZ': '%5ESSMI',
    'GBR': '%5EFTSE',
    'UAE': 'UAE',
    'HKG': '%5EHSI',
    'NZL': '%5ENZ50',
    'SGP': '%5ESTI',
    'MEX': '%5EMXX',
    'KOR': 'EWY',
    'TUR': 'TUR',
}


def cs_op(cnt_ind):
    nums = 0
    p1 = "http://real-chart.finance.yahoo.com/table.csv?s="
    d = str(now.day)
    p3 = "&a=10&b=" + d + "&c=2013&d=07&e=" + d + "&f=2014&g=d&ignore=.csv"
    P = ''
    for k in cnt_ind:

        p2 = cnt_ind[k]
        P = p1 + p2 + p3

        t = "Indices/" +"chart_" + k + ".csv"

        U = urllib2.urlopen(P)
        z = open(t, "wb")
        print t

        cvr = csv.reader(U)
        cvw = csv.writer(z)

        headers = cvr.next()

        headers = ['date', 'close']
        cvw.writerow(headers)

        for row in cvr:
            del row[1:6]
            date = datetime.datetime.strptime(row[0], '%Y-%m-%d')
            row[0] = date.strftime('%d %b %y')
            cvw.writerow(row)

        U.close()

        z.close()

    return


cs_op(cnt_ind)
# cs_op(p_2)





def rus():
    z = open("chart_RUS.csv", "wb")

    U = open("rus.csv", "rb")
    cvr = csv.reader(U, delimiter=';', quotechar='"')
    cvw = csv.writer(z, delimiter=',', quotechar='"')

    headers = cvr.next()
    headers = ['date', 'close']
    cvw.writerow(headers)

    for row in cvr:
        del row[0:2]
        del row[1:2]
        del row[2:7]
        cvw.writerow(row)

    z.close()

    return

