

$(document).ready(function () {

    $("button").click(function () {
        getBanners('http://185.55.226.152/r6Api/api/AdDispatcher/AdList', 'div[data-adpanel=true]',
            [{
                "AdKey": "a35c8081-1d85-4ca9-84aa-f0103651ae94",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b1.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 380,
                "BannerWidth": 200,
                "BannerHeight": 45,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer1",
                "Description": "Description For This banner would be something usefull in future."
            },
            {
                "AdKey": "2e599093-2bd5-431c-9f51-3330ce4e14fd",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b2.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 365,
                "BannerWidth": 210,
                "BannerHeight": 46,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer2",
                "Description": "Description For This banner would be something usefull in future."
            },
            {
                "AdKey": "9e6f0029-12a1-49e2-8565-2f76aa904d2e",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b3.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 537,
                "BannerWidth": 220,
                "BannerHeight": 47,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer3",
                "Description": "Description For This banner would be something usefull in future."
            },
            {
                "AdKey": "b7a056c1-0fc9-4e2a-88e9-3d00235e6b73",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b4.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 397,
                "BannerWidth": 300,
                "BannerHeight": 60,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer4",
                "Description": "Description For This banner would be something usefull in future."
            },
            {
                "AdKey": "77c6cfe3-0299-44a9-bca5-4312547b384a",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b5.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 234,
                "BannerWidth": 310,
                "BannerHeight": 61,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer5",
                "Description": "Description For This banner would be something usefull in future."
            },
            {
                "AdKey": "60ba3257-6a21-40b0-a72c-2db2b2944254",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b6.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 259,
                "BannerWidth": 400,
                "BannerHeight": 70,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer6",
                "Description": "Description For This banner would be something usefull in future."
            },
            {
                "AdKey": "5bd1c51d-567b-40c9-bb95-16a10da852d9",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b7.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 590,
                "BannerWidth": 500,
                "BannerHeight": 75,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer7",
                "Description": "Description For This banner would be something usefull in future."
            },
            {
                "AdKey": "1a9d1787-a8da-4517-97b7-2dd6230f1f51",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b8.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 228,
                "BannerWidth": 100,
                "BannerHeight": 75,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer8",
                "Description": "Description For This banner would be something usefull in future."
            },
            {
                "AdKey": "1b310e48-06c8-49b7-9185-fb3e3ccf8e28",
                "SessionID": 71443,
                "BannerURL": "http://YourSite/BannerCDN/b9.jpg",
                "TargetURL": "http://TargetSite.com/Index.html",
                "DelaySeconds": 429,
                "BannerWidth": 800,
                "BannerHeight": 75,
                "BannerMIE": "images/JPEG",
                "ObjectID": "onjcontainer9",
                "Description": "Description For This banner would be something usefull in future."
            }
            ])
    })
})

function getBanners(url, targetElement, jsonresponse) {
    creatArrayThatdonthaveDelayTime(targetElement)
        .then(function (arr) {
            getData(url, arr)
                .done(function (data) {
                    processeDataOnsuccesState(data)
                        .then(function (delayArr) {
                            setDelayArr(delayArr)
                                .then(function (setDelayArr) {
                                    timeOut(targetElement, url, setDelayArr, jsonresponse)
                                })
                        })
                })
                .fail(function () {
                    processeDataOnFailState(targetElement, jsonresponse)
                        .then(function (delayArr) {
                            setDelayArr(delayArr)
                                .then(function (setDelayArr) {
                                    timeOut(targetElement, url, setDelayArr, jsonresponse)
                                })
                        })
                })
        })
}


function creatArrayThatdonthaveDelayTime(targetElement) {
    return new Promise(function (resolve) {
        var arr = new Array();
        var i = 1;
        var delaytime;
        arr.push({ "SessionID": localStorage.getItem("SessionID") });//get sessionId if doesnt exist return null
        $(targetElement).each(function () {
            delaytime = $(this).attr("data-delayinseconds")
            if (delaytime === "0") {
                arr.push({

                    "id": i++,
                    "siteName": "mysitename",
                    "adWidth": $(this).attr("data-adwidth"),
                    "adHeight": $(this).attr("data-adheight"),
                    "objId": $(this).attr("id"),

                })
            }

        })
        return resolve(arr)
    })
}


function getData(url, arr) {
    return $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(arr),

    })
}







function processeDataOnsuccesState(targetElement, jsonresponse) {
    var response = $.parseJSON(JSON.stringify(jsonresponse))
    var delayArr = new Array;
    const DELAY_RATE = 1000;
    return new Promise(function (resolve) {
        response.forEach(function (response) {
            $(targetElement).each(function () {
                if ($(this).attr("id") == response.ObjectID) {
                    $(this).empty();
                    $(this).append("<a href=" + response.TargetURL + "><span>" + response.BannerURL + "</span></a>")
                    $(this).attr("data-delayinseconds", " ")
                    $(this).attr("data-delayinseconds", response.DelaySeconds)
                    delayArr.push(response.DelaySeconds)
                    localStorage.setItem("SessionID", response.SessionID)
                }
            })
        })

        return resolve(delayArr * DELAY_RATE)
    })

}




function processeDataOnFailState(targetElement, jsonresponse) {
    var response = $.parseJSON(JSON.stringify(jsonresponse))
    var delayArr = new Array;
    const DELAY_RATE = 1000;
    return new Promise(function (resolve) {
        response.forEach(function (response) {
            $(targetElement).each(function () {
                if ($(this).attr("id") == response.ObjectID) {
                    $(this).empty();
                    $(this).append("<a href=" + response.TargetURL + "><span>" + response.BannerURL + "</span></a>")
                    $(this).attr("data-delayinseconds", " ")
                    $(this).attr("data-delayinseconds", response.DelaySeconds)
                    delayArr.push(response.DelaySeconds * DELAY_RATE)
                    localStorage.setItem("SessionID", response.SessionID)
                }


            })
        })
        return resolve(delayArr)
    })

}





function setDelayArr(delayArr) {
 
    return new Promise(function (resolve) {
        if (delayArr) {
            var setDelayArr = new Array();
            $.each(delayArr, function (i, el) {
                if ($.inArray(el, setDelayArr) === -1) setDelayArr.push(el);
            });
        } else {
            console.log("delayArr dosnt exist for set!!!")
        }

        return resolve(setDelayArr)
    })
}






function timeOut(targetElement, url, delayArr, jsonresponse) {
    console.log(delayArr)
    delayArr.forEach(function (array) {
        setTimeout(function () {

            $(targetElement).each(function () {
                delaytime = $(this).attr("data-delayinseconds")
                if (delaytime == array) {
                   
                    $(this).attr("data-delayinseconds", 0)
                }})
            getBanners(url, targetElement, jsonresponse)
            console.log(Date() + "in" + array + "seconds")
        }, array)
    })

}



