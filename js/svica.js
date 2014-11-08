var url_id;
var id;

function path(b) {
  var ul = $('ul.path').empty();
  var x;
  $.getJSON('paths.json', function(data) {
    var x = (data[b]);
    var y = [];
    for (var i = 0, len = x.length; i < len; i++) {
      y.push(x[i])
    }
    var ll = (x.length) - 3;
    var i = 0;

    var loops = function() {
      console.log('Loop count: ' + i);

      if (ll > i) {
        ul.append('<li>' + y[i] + '</li>');
        i++;
      } else {
        var n = i + 2;
        var pr = y[n],
          pr = pr.toPrecision(6);
        ul.append('<li class="line">' + 'Net gain:   ' + pr  + '</li>');

        return;
      }

      setTimeout(loops, 2000);
    };

    loops();
  });


}


function mapz(b) {


  $(" #map ").remove('#map');


  $(" .ma ").append('<div id="map" class="dark"></div>');

  $.getJSON('arcs.json', function(data) {


  
    var x = String(b);
    var pairs = data[x];

    var map = L.mapbox.map('map', 'examples.map-2k9d7u0c', {

        attributionControl: false,
        infoControl: true

      })
      .setView([10, 0], 1);

    map.infoControl
      .addInfo('<a href="https://developer.yahoo.com/yql/">' + "The path of arbitrage was modelled as a shortest path problem with both Dijkstra's algorithm and the Bellman-Ford Algorithm being used to find the most profitable path. FX Bid and Ask prices were queried from YQL databases daily at 7:00, 15:00, and 20:00 GMT" + '</a>');

    // Disable drag and zoom handlers.
    // Making this effect work with zooming and panning
    // would require a different technique with different
    // tradeoffs.
    /* map.dragging.disable();*/
    //        map.touchZoom.enabled();
    //        map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    if (map.tap) map.tap.disable();

    // Transform the short [lat,lng] format in our
    // data into the {x, y} expected by arc.js.
    function obj(pairs) {
      return {
        y: pairs[0],
        x: pairs[1]
      };
    }

    for (var i = 0; i < pairs.length; i++) {
      // Transform each pair of coordinates into a pretty
      // great circle using the Arc.js plugin, as included above.
      var generator = new arc.GreatCircle(
        obj(pairs[i][0]),
        obj(pairs[i][1]));
      var line = generator.Arc(100, {
        offset: 10
      });
      // Leaflet expects [lat,lng] arrays, but a lot of
      // software does the opposite, including arc.js, so
      // we flip here.
      var newLine = L.polyline(line.geometries[0].coords.map(function(c) {
          return c.reverse();
        }), {
          color: '#ffcc00',
          weight: 1,
          opacity: 1
        })
        .addTo(map);
      var totalLength = newLine._path.getTotalLength();
      newLine._path.classList.add('path-start');
      // This pair of CSS properties hides the line initially
      // See http://css-tricks.com/svg-line-animation-works/
      // for details on this trick.
      newLine._path.style.strokeDashoffset = totalLength;
      newLine._path.style.strokeDasharray = totalLength;
      // Offset the timeout here: setTimeout makes a function
      // run after a certain number of milliseconds - in this
      // case we want each flight path to be staggered a bit.
      setTimeout((function(path) {
        return function() {
          // setting the strokeDashoffset to 0 triggers
          // the animation.
          path.style.strokeDashoffset = 0;


        };
      })(newLine._path), i * 5000);
    }
  });


}

function do_url(id) {

  id = id;
  url_id = id;


}


function go(id) {
  $("#map").remove("#map");

  do_url(id);
  var
    o,
    f,
    g,
    c,
    b,
    ind,
    s,
    a;


  if (id == 1) {
    f = {
      "EUR": 1
    };
    g = "EUR";
    b = "EUR";
    s = '€';
    c = 'Amsterdam';
    a = 2;
    o = "EUR";
    ind = 'EURO STOXX 50 ';
  } else if (id == 2) {
    f = {
      "JPY": 1
    };
    g = "JPN";
    s = '¥';
    b = "JPY";
    o = "ASIA";
    c = 'Tokyo';
    a = 9;
    ind = 'Nikkei 225';
  } else if (id == 3) {
    f = {
      "CHN": 1
    };
    g = "PRC";
    s = '¥';
    b = "CNY";
    c = 'Shanghai';
    a = 8;
    o = "ASIA";
    ind = 'SSE Composite Index ';
  } else if (id == 4) {
    f = {
      "GB": 1
    };
    g = "GBR";
    s = "£";
    b = "GBP";
    c = 'London';
    a = 1;
    o = "EUR";
    ind = 'FTSE 100 Index';
  } else if (id == 5) {
    f = {
      "CAN": 1
    };
    g = "CAN";
    b = "CAD";
    c = 'Toronto';
    a = (-4);
    s = '$';
    o = "AMR";
    ind = 'S&P/TSX Composite Index';
  } else if (id == 6) {
    f = {
      "KOR": 1
    };
    g = "KOR";
    b = "KRW";
    c = 'Seoul';
    a = (9);
    s = '₩';
    o = "ASIA";
    ind = "iShares MSCI South Korea Capped";
  } else if (id == 7) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "AUS";
    b = "AUD";
    c = "Sydney";
    a = 10;
    s = '$';
    o = "ASIA";
    ind = "S&P/ASX 200";
  } else if (id == 8) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "NZL";
    b = "NZD";
    c = 'Wellington';
    a = 12;
    s = '$';
    o = "ASIA";
    ind = 'NZX 50 Index ';
  } else if (id == 9) {
    f = {
      "SWZ": 1
    };
    g = "SWZ";
    b = "CHF";
    s = b;
    c = 'Geneva';
    a = 2;
    o = "EUR";
    ind = 'Swiss Market Index ';
  } else if (id == 10) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "NOR";
    b = "NOK";
    c = 'Oslo';
    a = 2;
    s = 'kr';
    o = "EUR";
    ind = 'OSLO OBX PRICE INDX';
  } else if (id == 11) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "SWE";
    b = "SEK";
    c = 'Stockholm';
    o = "EUR";
    s = 'kr';

    ind = 'OMX Stockholm 30 Index ';
  } else if (id == 12) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "SGP";
    b = "SGD";
    c = 'Singapore';
    a = 8;
    s = '$';
    o = "ASIA";
    ind = 'FTSE Straits Times Index ';
  } else if (id == 13) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "HKG";
    b = "HKD";
    c = 'Hong Kong';
    a = 8;
    s = '$';
    o = "ASIA";
    ind = "Hang Seng Index";
  } else if (id == 14) {
    f = {
      "CHN": 1
    };
    g = "PRC";
    b = "CNY";
    c = 'Shanghai';
    a = 8;
    s = '￥';
    o = "ASIA";
    ind = 'SSE Composite Index ';
  } else if (id == 15) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "IND";
    b = "INR";
    c = 'Mumbai';
    a = 5.5;
    s = '₹';
    o = "ASIA";
    ind = 'S&P BSE SENSEX';
  } else if (id == 16) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "RUS";
    b = "RUB";
    c = 'Moscow';
    a = 4;
    o = "EUR";
    s = '₽';
    ind = "The RTS Index";
  } else if (id == 17) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "MEX";
    b = "MXN";
    ind = 'Mexico IPC Index ';
    c = 'Mexico City';
    o = "AMR";
    a = (-10);
    s = '$';
  } else if (id == 18) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "TUR";
    b = "TRY";
    c = 'Istanbul';
    a = 3;
    s = '₺';
    o = "EUR";
    ind = 'MSCI Emerging Markets Index';
  } else if (id == 19) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "UAE";
    b = "AED";
    c = 'Dubai';
    a = 4;
    s = 'د.إ';
    o = "ASIA";
    ind = 'MSCI Emerging Markets Index';
  } else if (id == 20) {
    f = {
      "5YR": 1,
      "3YR": 1
    };
    g = "BRL";
    b = "BRL";
    c = 'São Paulo';
    o = "AMR";
    a = (-3);
    s = 'R$';
    ind = 'BMFBOVESPA';
  }


  setTimeout(function() {
    path(b);
    spark(g, ind, s);
    clockin(c, a);
    opinion(o);
    brief(o);
  }, 100);
  setTimeout(function() {
    mapz(b);
    volat(g, s);
    feed("http://pipes.yahoo.com/pipes/pipe.run?_id=5a94d8843f09499ee394f90059a23eba&_render=rss");
  }, 2000);
}


function opinion(o) {




  //    var i=JSON.stringify(x);
  //    var i=JSON.parse([x[0]]);

  var db = $('.db');
  var cs = $('.cs');
  $.getJSON("analysis.json", function(data) {
    var d = data[0].DB,

      d = (d[o]);
    var c = data[0].CS,
      c = (c[o]);


    $(db).append("<a href='https://www.deawm.com/Thought-Leadership/Document-Center/69'><p id='p2'>>>>Deutsche Bank Forecast" + "</p></a>" + "<p>" + d + "</p>");
    $(cs).append("<a href='https://www.credit-suisse.com/us/en/news-and-expertise/news/economy/global-trends.article.html/article/pwp/news-and-expertise/2014/01/en/2014-investment-outlook-equities-likely-to-outperform.html'><p id='p2'>>>>Credit Suisse Forecast" + "</p></a>" + "<p>" + c + "</p>");

  });

}

function clockin(c, a) {
  var a = parseInt(a);
  $("#clock svg").remove("svg");
  $("#clock ").empty();

  var t;
  var handData;

  $("#infoside .page-title").append(c);

  var radians = 0.0174532925,
    clockRadius = 100,
    margin = 50,
    width = (clockRadius + margin) * 2,
    height = (clockRadius + margin) * 2,
    hourHandLength = 2 * clockRadius / 3,
    minuteHandLength = clockRadius,
    secondHandLength = clockRadius - 12,
    secondHandBalance = 30,
    secondTickStart = clockRadius
  secondTickLength = -10,
    hourTickStart = clockRadius,
    hourTickLength = -18
  secondLabelRadius = clockRadius + 16;
  secondLabelYOffset = 5
  hourLabelRadius = clockRadius - 40,
    hourLabelYOffset = 7,
    clockTimeOffset = a, //give the UTC offset India is 5.5 hrs ahead of UTC
    timeOffset = new Date().getTimezoneOffset(),
    timeOffset = timeOffset / 60, //get hours
    clockTimeOffset = 0;


  var hourScale = d3.scale.linear()
    .range([0, 330])
    .domain([0, 11]);

  var minuteScale = secondScale = d3.scale.linear()
    .range([0, 354])
    .domain([0, 59]);

  var handData = [{
    type: 'hour',
    value: 0,
    length: -hourHandLength,
    scale: hourScale
  }, {
    type: 'minute',
    value: 0,
    length: -minuteHandLength,
    scale: minuteScale
  }, {
    type: 'second',
    value: 0,
    length: -secondHandLength,
    scale: secondScale,
    balance: secondHandBalance
  }];

  function drawClock() { //create all the clock elements
    updateData(); //draw them in the correct starting position
    var svg = d3.select("#clock").append("svg:svg")
      .attr("width", width)
      .attr("height", height);

    var face = svg.append('g')
      .attr('id', 'clock-face')
      .attr('transform', 'translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

    //add marks for seconds
    face.selectAll('.second-tick')
      .data(d3.range(0, 60)).enter()
      .append('line')
      .attr('class', 'second-tick')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', secondTickStart)
      .attr('y2', secondTickStart + secondTickLength)
      .attr('transform', function(d) {
        return 'rotate(' + secondScale(d) + ')';
      });
    //and labels

    face.selectAll('.second-label')
      .data(d3.range(5, 61, 5))
      .enter()
      .append('text')
      .attr('class', 'second-label')
      .attr('text-anchor', 'middle')
      .attr('x', function(d) {
        return secondLabelRadius * Math.sin(secondScale(d) * radians);
      })
      .attr('y', function(d) {
        return -secondLabelRadius * Math.cos(secondScale(d) * radians) + secondLabelYOffset;
      })
      .text(function(d) {
        return d;
      });

    //... and hours
    face.selectAll('.hour-tick')
      .data(d3.range(0, 12)).enter()
      .append('line')
      .attr('class', 'hour-tick')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', hourTickStart)
      .attr('y2', hourTickStart + hourTickLength)
      .attr('transform', function(d) {
        return 'rotate(' + hourScale(d) + ')';
      });

    face.selectAll('.hour-label')
      .data(d3.range(3, 13, 3))
      .enter()
      .append('text')
      .attr('class', 'hour-label')
      .attr('text-anchor', 'middle')
      .attr('x', function(d) {
        return hourLabelRadius * Math.sin(hourScale(d) * radians);
      })
      .attr('y', function(d) {
        return -hourLabelRadius * Math.cos(hourScale(d) * radians) + hourLabelYOffset;
      })
      .text(function(d) {
        return d;
      });


    var hands = face.append('g').attr('id', 'clock-hands');

    face.append('g').attr('id', 'face-overlay')
      .append('circle').attr('class', 'hands-cover')
      .attr('x', 0)
      .attr('y', 0)
      .attr('r', clockRadius / 20);

    hands.selectAll('line')
      .data(handData)
      .enter()
      .append('line')
      .attr('class', function(d) {
        return d.type + '-hand';
      })
      .attr('x1', 0)
      .attr('y1', function(d) {
        return d.balance ? d.balance : 0;
      })
      .attr('x2', 0)
      .attr('y2', function(d) {
        return d.length;
      })
      .attr('transform', function(d) {
        return 'rotate(' + d.scale(d.value) + ')';
      });
  }

  function moveHands() {

    d3.select('#clock-hands').selectAll('line')
      .data(handData)
      .transition()
      .attr('transform', function(d) {
        return 'rotate(' + d.scale(d.value) + ')';
      });
  }

  function updateData() {

    var t = new Date();

    handData[0].value = t.getUTCHours() + a + t.getUTCMinutes() / 60;
    handData[1].value = t.getUTCMinutes();
    handData[2].value = t.getUTCSeconds();
  }


  drawClock();

  setInterval(function() {
    updateData();
    moveHands();
  }, 1000);

  d3.select(self.frameElement).style("height", height + "px");
  return;
}

function spark(g, ind, s) {
  $('.spark p#p2').remove('#p2');
  $('.spark ').append('<p id="p2">>>>' + ind + '</p>');

  $('.spark svg').remove('svg');
  var margin = {
      top: 20,
      right: 70,
      bottom: 30,
      left: 40
    },
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%d %b %y").parse,
    bisectDate = d3.bisector(function(d) {
      return d.date;
    }).left,
    formatValue = d3.format(",.2f"),
    formatCurrency = function(d) {
      return s + formatValue(d);
    };

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.close);
    });

  var svg = d3.select(".spark").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv('D3\ data/Indices/chart_' + encodeURIComponent(g) + '.csv', function(data) {
    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    data.sort(function(a, b) {
      return a.date - b.date;
    });

    x.domain([data[0].date, data[data.length - 1].date]);
    y.domain(d3.extent(data, function(d) {
      return d.close;
    }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.2em")
      .attr("transform", function(d) {
        return "rotate(-35)";
      });

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text('Indexed ' + s);

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

    var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("circle")
      .attr("r", 4.5);

    focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");
    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() {
        focus.style("display", null);
      })
      .on("mouseout", function() {
        focus.style("display", "none");
      })
      .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
      focus.select("text").text(formatCurrency(d.close));
    }
  });
}

function volat(g, s) {
  $('#chart svg').remove('svg');
  $('#chart').append('<svg><svg>');

  d3.json('D3\ data/Volatility/' + encodeURIComponent(g) + '_vol.json', function(data) {
    nv.addGraph(function() {

      var chart = nv.models.linePlusBarChart()
        .margin({
          top: 30,
          right: 40,
          bottom: 50,
          left: 40
        })
        //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
        .x(function(d, i) {
          return i
        })
        .y(function(d) {
          return d[1]
        });


      chart.xAxis.tickFormat(function(d) {
        var dx = data[0].values[d] && data[0].values[d][0] || 0;
        return d3.time.format('%x')(new Date(dx))
      });

      chart.y1Axis
        .tickFormat(d3.format(',f'));

      chart.y2Axis
        .tickFormat(function(d) {
          return s + d3.format(',f')(d)
        });

      chart.bars.forceY([0]);

      d3.select('#chart svg')
        .datum(data)
        .transition()
        .duration(0)
        .call(chart);


      nv.utils.windowResize(chart.update);


      return chart;
    });

  });
}


function brief(o) {
  var u;
  if (o == "EUR") {
    var u = "http://pipes.yahoo.com/pipes/pipe.run?_id=2189bd794b78f8875ebac2d093074149&_render=json";
  } else if (o == "AMR") {
    var u = "http://pipes.yahoo.com/pipes/pipe.run?_id=9c4ec7c54434a4f7d65354e300b47a32&_render=json";
  } else if (o == "ASIA") {
    var u = "http://pipes.yahoo.com/pipes/pipe.run?_id=4031486e3fc0682f2e9a6340045c40ff&_render=json";
  }
  $(".m_brief").empty();
  $.getJSON(u, function(data) {
    var d = String(data.value.items[0].content);
    var c = String(data.value.items[0].link);
    $(".m_brief").append('<p id="p2">>>>Market Brief</p>' + '<a href="' + c + '">' + d + '</a>');


  })
}

function feed(url) {
  var
    rss = this;
  rss.FEED_URL = url;

  rss.J = []; //create a new array
  rss.widgetHolder = $('.rss-widget ul');
  rss.storiesLimit = 30;

  $.ajax({
    url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(rss.FEED_URL),
    dataType: 'json',
    success: function(dat) {
      if (dat.responseData.feed && dat.responseData.feed.entries) {
        $.each(dat.responseData.feed.entries, function(i, e) {
          rss.J.push({ //add objects to the array
            title: e.title,

            content: e.content || "",
            link: e.link
          });
        });

        if (rss.storiesLimit > rss.J.length)
          rss.storiesLimit = rss.J.length;

        for (var i = 0; i < rss.storiesLimit; i++) {
          rss.renderBlogItem(rss.J[i]);
        }

        $('.rss-widget li').each(function() {
          var delay = ($(this).index() / rss.storiesLimit) + 's';
          $(this).css({
            webkitAnimationDelay: delay,
            mozAnimationDelay: delay,
            animationDelay: delay
          });
        });


      }
    }
  });

  rss.renderBlogItem = function(obje) {
    var item = '<li class="blog-item">';

    item += '<a href="' + obje.link + '">';
    item += '<div class="blog-item-title">' + obje.title + '</div>';
    item += '</a>';
    item += '</li>';

    rss.widgetHolder.append(item);
  };

}


jQuery(document).ready(function($) {


  var cols = {},

    messageIsOpen = false;


  cols.showOverlay = function() {
    $('body').addClass('show-main-overlay');
  };
  cols.hideOverlay = function() {
    $('body').removeClass('show-main-overlay');
  };


  cols.showMessage = function() {
    $('body').addClass('show-infoside');

    messageIsOpen = true;


  };
  cols.hideMessage = function() {
    $('body').removeClass('show-infoside');
    $('#main').find('.infoside-list li').removeClass('active');


    messageIsOpen = false;


  };


  cols.showSidebar = function() {
    $('body').addClass('show-sidebar');
  };
  cols.hideSidebar = function() {
    $('body').removeClass('show-sidebar');
  };


  $('.trigger-toggle-sidebar').on('click', function() {
    cols.showSidebar();
    cols.showOverlay();
  });


  $('.trigger-infoside-close').on('click', function() {
    cols.hideMessage();
    cols.hideOverlay();


  });


  $("#main").find(".infoside-list li").on('click', function(e) {
    var item = $(this),
      target = $(e.target);

    if (target.is('label')) {
      item.toggleClass('selected');
    } else {
      if (messageIsOpen && item.is('.active')) {

        cols.hideMessage();
        cols.hideOverlay();
      } else {
        if (messageIsOpen) {
          cols.hideMessage();

          item.addClass('active');
          setTimeout(function() {
            cols.showMessage();


          }, 300);
        } else {
          item.addClass('active');
          cols.showMessage();

          $('.rss-widget li').remove('.rss-widget li');

          $('.m_brief p').remove('.m_brief p');
          $(".db p").remove(".db p");
          $(".cs p").remove(".cs p");
          $("#clock svg").remove("svg");
          $("#clock ").empty();


          $(" #infoside .header .page-title:not(.icon)").empty();

        }
        cols.showOverlay();
      }
    }
  });


  $('input[type=checkbox]').on('click', function(e) {
    e.stopImmediatePropagation();
  });


  // When you click the overlay, close everything

  $('#main > .overlay').on('click', function() {
    cols.hideOverlay();
    cols.hideMessage();

    cols.hideSidebar();
  });


  // Enable sexy scrollbars
  $('.nano').nanoScroller();


  // Disable links

  $('a').on('click', function(e) {
    e.preventDefault();
  });


  // Search box responsive stuff

  $('.search-box input').on('focus', function() {
    if ($(window).width() <= 1360) {
      cols.hideMessage();
    }
  });

});


/*! nanoScrollerJS - v0.8.0 - 2014
 * http://jamesflorentino.github.com/nanoScrollerJS/
 * Copyright (c) 2014 James Florentino; Licensed MIT */
(function($, window, document) {
  "use strict";
  var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, cAF, defaults, getBrowserScrollbarWidth, hasTransform, isFFWithBuggyScrollbar, rAF, transform, _elementStyle, _prefixStyle, _vendor;
  defaults = {

    /**
     a classname for the pane element.
     @property paneClass
     @type String
     @default 'nano-pane'
     */
    paneClass: 'nano-pane',

    /**
     a classname for the slider element.
     @property sliderClass
     @type String
     @default 'nano-slider'
     */
    sliderClass: 'nano-slider',

    /**
     a classname for the content element.
     @property contentClass
     @type String
     @default 'nano-content'
     */
    contentClass: 'nano-content',

    /**
     a setting to enable native scrolling in iOS devices.
     @property iOSNativeScrolling
     @type Boolean
     @default false
     */
    iOSNativeScrolling: false,

    /**
     a setting to prevent the rest of the page being
     scrolled when user scrolls the `.content` element.
     @property preventPageScrolling
     @type Boolean
     @default false
     */
    preventPageScrolling: false,

    /**
     a setting to disable binding to the resize event.
     @property disableResize
     @type Boolean
     @default false
     */
    disableResize: false,

    /**
     a setting to make the scrollbar always visible.
     @property alwaysVisible
     @type Boolean
     @default false
     */
    alwaysVisible: false,

    /**
     a default timeout for the `flash()` method.
     @property flashDelay
     @type Number
     @default 1500
     */
    flashDelay: 1500,

    /**
     a minimum height for the `.slider` element.
     @property sliderMinHeight
     @type Number
     @default 20
     */
    sliderMinHeight: 20,

    /**
     a maximum height for the `.slider` element.
     @property sliderMaxHeight
     @type Number
     @default null
     */
    sliderMaxHeight: null,

    /**
     an alternate document context.
     @property documentContext
     @type Document
     @default null
     */
    documentContext: null,

    /**
     an alternate window context.
     @property windowContext
     @type Window
     @default null
     */
    windowContext: null
  };

  /**
   @property SCROLLBAR
   @type String
   @static
   @final
   @private
   */
  SCROLLBAR = 'scrollbar';

  /**
   @property SCROLL
   @type String
   @static
   @final
   @private
   */
  SCROLL = 'scroll';

  /**
   @property MOUSEDOWN
   @type String
   @final
   @private
   */
  MOUSEDOWN = 'mousedown';

  /**
   @property MOUSEMOVE
   @type String
   @static
   @final
   @private
   */
  MOUSEMOVE = 'mousemove';

  /**
   @property MOUSEWHEEL
   @type String
   @final
   @private
   */
  MOUSEWHEEL = 'mousewheel';

  /**
   @property MOUSEUP
   @type String
   @static
   @final
   @private
   */
  MOUSEUP = 'mouseup';

  /**
   @property RESIZE
   @type String
   @final
   @private
   */
  RESIZE = 'resize';

  /**
   @property DRAG
   @type String
   @static
   @final
   @private
   */
  DRAG = 'drag';

  /**
   @property UP
   @type String
   @static
   @final
   @private
   */
  UP = 'up';

  /**
   @property PANEDOWN
   @type String
   @static
   @final
   @private
   */
  PANEDOWN = 'panedown';

  /**
   @property DOMSCROLL
   @type String
   @static
   @final
   @private
   */
  DOMSCROLL = 'DOMMouseScroll';

  /**
   @property DOWN
   @type String
   @static
   @final
   @private
   */
  DOWN = 'down';

  /**
   @property WHEEL
   @type String
   @static
   @final
   @private
   */
  WHEEL = 'wheel';

  /**
   @property KEYDOWN
   @type String
   @static
   @final
   @private
   */
  KEYDOWN = 'keydown';

  /**
   @property KEYUP
   @type String
   @static
   @final
   @private
   */
  KEYUP = 'keyup';

  /**
   @property TOUCHMOVE
   @type String
   @static
   @final
   @private
   */
  TOUCHMOVE = 'touchmove';

  /**
   @property BROWSER_IS_IE7
   @type Boolean
   @static
   @final
   @private
   */
  BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;

  /**
   @property BROWSER_SCROLLBAR_WIDTH
   @type Number
   @static
   @default null
   @private
   */
  BROWSER_SCROLLBAR_WIDTH = null;
  rAF = window.requestAnimationFrame;
  cAF = window.cancelAnimationFrame;
  _elementStyle = document.createElement('div').style;
  _vendor = (function() {
    var i, transform, vendor, vendors, _i, _len;
    vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
    for (i = _i = 0, _len = vendors.length; _i < _len; i = ++_i) {
      vendor = vendors[i];
      transform = vendors[i] + 'ransform';
      if (transform in _elementStyle) {
        return vendors[i].substr(0, vendors[i].length - 1);
      }
    }
    return false;
  })();
  _prefixStyle = function(style) {
    if (_vendor === false) {
      return false;
    }
    if (_vendor === '') {
      return style;
    }
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
  };
  transform = _prefixStyle('transform');
  hasTransform = transform !== false;

  /**
   Returns browser's native scrollbar width
   @method getBrowserScrollbarWidth
   @return {Number} the scrollbar width in pixels
   @static
   @private
   */
  getBrowserScrollbarWidth = function() {
    var outer, outerStyle, scrollbarWidth;
    outer = document.createElement('div');
    outerStyle = outer.style;
    outerStyle.position = 'absolute';
    outerStyle.width = '100px';
    outerStyle.height = '100px';
    outerStyle.overflow = SCROLL;
    outerStyle.top = '-9999px';
    document.body.appendChild(outer);
    scrollbarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);
    return scrollbarWidth;
  };
  isFFWithBuggyScrollbar = function() {
    var isOSXFF, ua, version;
    ua = window.navigator.userAgent;
    isOSXFF = /(?=.+Mac OS X)(?=.+Firefox)/.test(ua);
    if (!isOSXFF) {
      return false;
    }
    version = /Firefox\/\d{2}\./.exec(ua);
    if (version) {
      version = version[0].replace(/\D+/g, '');
    }
    return isOSXFF && +version > 23;
  };

  /**
   @class NanoScroll
   @param element {HTMLElement|Node} the main element
   @param options {Object} nanoScroller's options
   @constructor
   */
  NanoScroll = (function() {
    function NanoScroll(el, options) {
      this.el = el;
      this.options = options;
      BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
      this.$el = $(this.el);
      this.doc = $(this.options.documentContext || document);
      this.win = $(this.options.windowContext || window);
      this.$content = this.$el.children("." + options.contentClass);
      this.$content.attr('tabindex', this.options.tabIndex || 0);
      this.content = this.$content[0];
      if (this.options.iOSNativeScrolling && (this.el.style.WebkitOverflowScrolling != null)) {
        this.nativeScrolling();
      } else {
        this.generate();
      }
      this.createEvents();
      this.addEvents();
      this.reset();
    }


    /**
     Prevents the rest of the page being scrolled
     when user scrolls the `.nano-content` element.
     @method preventScrolling
     @param event {Event}
     @param direction {String} Scroll direction (up or down)
     @private
     */

    NanoScroll.prototype.preventScrolling = function(e, direction) {
      if (!this.isActive) {
        return;
      }
      if (e.type === DOMSCROLL) {
        if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
          e.preventDefault();
        }
      } else if (e.type === MOUSEWHEEL) {
        if (!e.originalEvent || !e.originalEvent.wheelDelta) {
          return;
        }
        if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
          e.preventDefault();
        }
      }
    };


    /**
     Enable iOS native scrolling
     @method nativeScrolling
     @private
     */

    NanoScroll.prototype.nativeScrolling = function() {
      this.$content.css({
        WebkitOverflowScrolling: 'touch'
      });
      this.iOSNativeScrolling = true;
      this.isActive = true;
    };


    /**
     Updates those nanoScroller properties that
     are related to current scrollbar position.
     @method updateScrollValues
     @private
     */

    NanoScroll.prototype.updateScrollValues = function() {
      var content;
      content = this.content;
      this.maxScrollTop = content.scrollHeight - content.clientHeight;
      this.prevScrollTop = this.contentScrollTop || 0;
      this.contentScrollTop = content.scrollTop;
      if (!this.iOSNativeScrolling) {
        this.maxSliderTop = this.paneHeight - this.sliderHeight;
        this.sliderTop = this.maxScrollTop === 0 ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
      }
    };


    /**
     Updates CSS styles for current scroll position.
     Uses CSS 2d transfroms and `window.requestAnimationFrame` if available.
     @method setOnScrollStyles
     @private
     */

    NanoScroll.prototype.setOnScrollStyles = function() {
      var cssValue;
      if (hasTransform) {
        cssValue = {};
        cssValue[transform] = "translate(0, " + this.sliderTop + "px)";
      } else {
        cssValue = {
          top: this.sliderTop
        };
      }
      if (rAF) {
        if (!this.scrollRAF) {
          this.scrollRAF = rAF((function(_this) {
            return function() {
              _this.scrollRAF = null;
              _this.slider.css(cssValue);
            };
          })(this));
        }
      } else {
        this.slider.css(cssValue);
      }
    };


    /**
     Creates event related methods
     @method createEvents
     @private
     */

    NanoScroll.prototype.createEvents = function() {
      this.events = {
        down: (function(_this) {
          return function(e) {
            _this.isBeingDragged = true;
            _this.offsetY = e.pageY - _this.slider.offset().top;
            _this.pane.addClass('active');
            _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
            return false;
          };
        })(this),
        drag: (function(_this) {
          return function(e) {
            _this.sliderY = e.pageY - _this.$el.offset().top - _this.offsetY;
            _this.scroll();
            if (_this.contentScrollTop >= _this.maxScrollTop && _this.prevScrollTop !== _this.maxScrollTop) {
              _this.$el.trigger('scrollend');
            } else if (_this.contentScrollTop === 0 && _this.prevScrollTop !== 0) {
              _this.$el.trigger('scrolltop');
            }
            return false;
          };
        })(this),
        up: (function(_this) {
          return function(e) {
            _this.isBeingDragged = false;
            _this.pane.removeClass('active');
            _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]);
            return false;
          };
        })(this),
        resize: (function(_this) {
          return function(e) {
            _this.reset();
          };
        })(this),
        panedown: (function(_this) {
          return function(e) {
            _this.sliderY = (e.offsetY || e.originalEvent.layerY) - (_this.sliderHeight * 0.5);
            _this.scroll();
            _this.events.down(e);
            return false;
          };
        })(this),
        scroll: (function(_this) {
          return function(e) {
            _this.updateScrollValues();
            if (_this.isBeingDragged) {
              return;
            }
            if (!_this.iOSNativeScrolling) {
              _this.sliderY = _this.sliderTop;
              _this.setOnScrollStyles();
            }
            if (e == null) {
              return;
            }
            if (_this.contentScrollTop >= _this.maxScrollTop) {
              if (_this.options.preventPageScrolling) {
                _this.preventScrolling(e, DOWN);
              }
              if (_this.prevScrollTop !== _this.maxScrollTop) {
                _this.$el.trigger('scrollend');
              }
            } else if (_this.contentScrollTop === 0) {
              if (_this.options.preventPageScrolling) {
                _this.preventScrolling(e, UP);
              }
              if (_this.prevScrollTop !== 0) {
                _this.$el.trigger('scrolltop');
              }
            }
          };
        })(this),
        wheel: (function(_this) {
          return function(e) {
            var delta;
            if (e == null) {
              return;
            }
            delta = e.delta || e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail || (e.originalEvent && -e.originalEvent.detail);
            if (delta) {
              _this.sliderY += -delta / 3;
            }
            _this.scroll();
            return false;
          };
        })(this)
      };
    };


    /**
     Adds event listeners with jQuery.
     @method addEvents
     @private
     */

    NanoScroll.prototype.addEvents = function() {
      var events;
      this.removeEvents();
      events = this.events;
      if (!this.options.disableResize) {
        this.win.bind(RESIZE, events[RESIZE]);
      }
      if (!this.iOSNativeScrolling) {
        this.slider.bind(MOUSEDOWN, events[DOWN]);
        this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
      }
      this.$content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };


    /**
     Removes event listeners with jQuery.
     @method removeEvents
     @private
     */

    NanoScroll.prototype.removeEvents = function() {
      var events;
      events = this.events;
      this.win.unbind(RESIZE, events[RESIZE]);
      if (!this.iOSNativeScrolling) {
        this.slider.unbind();
        this.pane.unbind();
      }
      this.$content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };


    /**
     Generates nanoScroller's scrollbar and elements for it.
     @method generate
     @chainable
     @private
     */

    NanoScroll.prototype.generate = function() {
      var contentClass, cssRule, currentPadding, options, paneClass, sliderClass;
      options = this.options;
      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
      if (!this.$el.find("." + paneClass).length && !this.$el.find("." + sliderClass).length) {
        this.$el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
      }
      this.pane = this.$el.children("." + paneClass);
      this.slider = this.pane.find("." + sliderClass);
      if (BROWSER_SCROLLBAR_WIDTH === 0 && isFFWithBuggyScrollbar()) {
        currentPadding = window.getComputedStyle(this.content, null).getPropertyValue('padding-right').replace(/\D+/g, '');
        cssRule = {
          right: -14,
          paddingRight: +currentPadding + 14
        };
      } else if (BROWSER_SCROLLBAR_WIDTH) {
        cssRule = {
          right: -BROWSER_SCROLLBAR_WIDTH
        };
        this.$el.addClass('has-scrollbar');
      }
      if (cssRule != null) {
        this.$content.css(cssRule);
      }
      return this;
    };


    /**
     @method restore
     @private
     */

    NanoScroll.prototype.restore = function() {
      this.stopped = false;
      if (!this.iOSNativeScrolling) {
        this.pane.show();
      }
      this.addEvents();
    };


    /**
     Resets nanoScroller's scrollbar.
     @method reset
     @chainable
     @example
     $(".nano").nanoScroller();
     */

    NanoScroll.prototype.reset = function() {
      var content, contentHeight, contentPosition, contentStyle, contentStyleOverflowY, paneBottom, paneHeight, paneOuterHeight, paneTop, parentMaxHeight, right, sliderHeight;
      if (this.iOSNativeScrolling) {
        this.contentHeight = this.content.scrollHeight;
        return;
      }
      if (!this.$el.find("." + this.options.paneClass).length) {
        this.generate().stop();
      }
      if (this.stopped) {
        this.restore();
      }
      content = this.content;
      contentStyle = content.style;
      contentStyleOverflowY = contentStyle.overflowY;
      if (BROWSER_IS_IE7) {
        this.$content.css({
          height: this.$content.height()
        });
      }
      contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
      parentMaxHeight = parseInt(this.$el.css("max-height"), 10);
      if (parentMaxHeight > 0) {
        this.$el.height("");
        this.$el.height(content.scrollHeight > parentMaxHeight ? parentMaxHeight : content.scrollHeight);
      }
      paneHeight = this.pane.outerHeight(false);
      paneTop = parseInt(this.pane.css('top'), 10);
      paneBottom = parseInt(this.pane.css('bottom'), 10);
      paneOuterHeight = paneHeight + paneTop + paneBottom;
      sliderHeight = Math.round(paneOuterHeight / contentHeight * paneOuterHeight);
      if (sliderHeight < this.options.sliderMinHeight) {
        sliderHeight = this.options.sliderMinHeight;
      } else if ((this.options.sliderMaxHeight != null) && sliderHeight > this.options.sliderMaxHeight) {
        sliderHeight = this.options.sliderMaxHeight;
      }
      if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
        sliderHeight += BROWSER_SCROLLBAR_WIDTH;
      }
      this.maxSliderTop = paneOuterHeight - sliderHeight;
      this.contentHeight = contentHeight;
      this.paneHeight = paneHeight;
      this.paneOuterHeight = paneOuterHeight;
      this.sliderHeight = sliderHeight;
      this.slider.height(sliderHeight);
      this.events.scroll();
      this.pane.show();
      this.isActive = true;
      if ((content.scrollHeight === content.clientHeight) || (this.pane.outerHeight(true) >= content.scrollHeight && contentStyleOverflowY !== SCROLL)) {
        this.pane.hide();
        this.isActive = false;
      } else if (this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL) {
        this.slider.hide();
      } else {
        this.slider.show();
      }
      this.pane.css({
        opacity: (this.options.alwaysVisible ? 1 : ''),
        visibility: (this.options.alwaysVisible ? 'visible' : '')
      });
      contentPosition = this.$content.css('position');
      if (contentPosition === 'static' || contentPosition === 'relative') {
        right = parseInt(this.$content.css('right'), 10);
        if (right) {
          this.$content.css({
            right: '',
            marginRight: right
          });
        }
      }
      return this;
    };


    /**
     @method scroll
     @private
     @example
     $(".nano").nanoScroller({ scroll: 'top' });
     */

    NanoScroll.prototype.scroll = function() {
      if (!this.isActive) {
        return;
      }
      this.sliderY = Math.max(0, this.sliderY);
      this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
      this.$content.scrollTop((this.paneHeight - this.contentHeight + BROWSER_SCROLLBAR_WIDTH) * this.sliderY / this.maxSliderTop * -1);
      if (!this.iOSNativeScrolling) {
        this.updateScrollValues();
        this.setOnScrollStyles();
      }
      return this;
    };


    /**
     Scroll at the bottom with an offset value
     @method scrollBottom
     @param offsetY {Number}
     @chainable
     @example
     $(".nano").nanoScroller({ scrollBottom: value });
     */

    NanoScroll.prototype.scrollBottom = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL);
      this.stop().restore();
      return this;
    };


    /**
     Scroll at the top with an offset value
     @method scrollTop
     @param offsetY {Number}
     @chainable
     @example
     $(".nano").nanoScroller({ scrollTop: value });
     */

    NanoScroll.prototype.scrollTop = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
      this.stop().restore();
      return this;
    };


    /**
     Scroll to an element
     @method scrollTo
     @param node {Node} A node to scroll to.
     @chainable
     @example
     $(".nano").nanoScroller({ scrollTo: $('#a_node') });
     */

    NanoScroll.prototype.scrollTo = function(node) {
      if (!this.isActive) {
        return;
      }
      this.scrollTop(this.$el.find(node).get(0).offsetTop);
      return this;
    };


    /**
     To stop the operation.
     This option will tell the plugin to disable all event bindings and hide the gadget scrollbar from the UI.
     @method stop
     @chainable
     @example
     $(".nano").nanoScroller({ stop: true });
     */

    NanoScroll.prototype.stop = function() {
      if (cAF && this.scrollRAF) {
        cAF(this.scrollRAF);
        this.scrollRAF = null;
      }
      this.stopped = true;
      this.removeEvents();
      if (!this.iOSNativeScrolling) {
        this.pane.hide();
      }
      return this;
    };


    /**
     Destroys nanoScroller and restores browser's native scrollbar.
     @method destroy
     @chainable
     @example
     $(".nano").nanoScroller({ destroy: true });
     */

    NanoScroll.prototype.destroy = function() {
      if (!this.stopped) {
        this.stop();
      }
      if (!this.iOSNativeScrolling && this.pane.length) {
        this.pane.remove();
      }
      if (BROWSER_IS_IE7) {
        this.$content.height('');
      }
      this.$content.removeAttr('tabindex');
      if (this.$el.hasClass('has-scrollbar')) {
        this.$el.removeClass('has-scrollbar');
        this.$content.css({
          right: ''
        });
      }
      return this;
    };


    /**
     To flash the scrollbar gadget for an amount of time defined in plugin settings (defaults to 1,5s).
     Useful if you want to show the user (e.g. on pageload) that there is more content waiting for him.
     @method flash
     @chainable
     @example
     $(".nano").nanoScroller({ flash: true });
     */

    NanoScroll.prototype.flash = function() {
      if (this.iOSNativeScrolling) {
        return;
      }
      if (!this.isActive) {
        return;
      }
      this.reset();
      this.pane.addClass('flashed');
      setTimeout((function(_this) {
        return function() {
          _this.pane.removeClass('flashed');
        };
      })(this), this.options.flashDelay);
      return this;
    };

    return NanoScroll;

  })();
  $.fn.nanoScroller = function(settings) {
    return this.each(function() {
      var options, scrollbar;
      if (!(scrollbar = this.nanoscroller)) {
        options = $.extend({}, defaults, settings);
        this.nanoscroller = scrollbar = new NanoScroll(this, options);
      }
      if (settings && typeof settings === "object") {
        $.extend(scrollbar.options, settings);
        if (settings.scrollBottom != null) {
          return scrollbar.scrollBottom(settings.scrollBottom);
        }
        if (settings.scrollTop != null) {
          return scrollbar.scrollTop(settings.scrollTop);
        }
        if (settings.scrollTo) {
          return scrollbar.scrollTo(settings.scrollTo);
        }
        if (settings.scroll === 'bottom') {
          return scrollbar.scrollBottom(0);
        }
        if (settings.scroll === 'top') {
          return scrollbar.scrollTop(0);
        }
        if (settings.scroll && settings.scroll instanceof $) {
          return scrollbar.scrollTo(settings.scroll);
        }
        if (settings.stop) {
          return scrollbar.stop();
        }
        if (settings.destroy) {
          return scrollbar.destroy();
        }
        if (settings.flash) {
          return scrollbar.flash();
        }
      }
      return scrollbar.reset();
    });
  };
  $.fn.nanoScroller.Constructor = NanoScroll;
})(jQuery, window, document);