var accessToken = "66fd6f95345145e71e1218290652357f6eb9a1c6";
var core1 = "50ff68065067545623260287";
var core2 = "50ff6f065067545628060587";
var core3 = "TBD3";
var core4 = "TBD4";

var cores = {
    A0: {
        core: core2,
        pin: "D0"
    },
    A1: {
        core: core2,
        pin: "D1"
    },
    A2: {
        core: core2,
        pin: "D2"
    },
    A3: {
        core: core2,
        pin: "D3"
    },
    A4: {
        core: core1,
        pin: "D0"
    },
    A5: {
        core: core1,
        pin: "D1"
    },
    A6: {
        core: core1,
        pin: "D2"
    },
    A7: {
        core: core1,
        pin: "D3"
    },
    D0: {
        core: core4,
        pin: "D0"
    },
    D1: {
        core: core4,
        pin: "D1"
    },
    D2: {
        core: core4,
        pin: "D2"
    },
    D3: {
        core: core4,
        pin: "D3"
    },
    D4: {
        core: core3,
        pin: "D0"
    },
    D5: {
        core: core3,
        pin: "D1"
    },
    D6: {
        core: core3,
        pin: "D2"
    },
    D7: {
        core: core3,
        pin: "D3"
    }
}

$('.pin').on('click', function(e) {
    if ( $(this).hasClass('active') ) {
        var id = e.target.id;
        var pin = cores[id]
        togglePin(pin, "LOW");
        $(this).removeClass('active');
    } else {
        var id = e.target.id;
        var pin = cores[id]
        togglePin(pin, "HIGH");
        $(this).addClass('active');
    }
});

var source = new EventSource("https://api.spark.io/v1/devices/events?access_token=" + accessToken);

source.onopen = function() {
  checkPins();
}

source.addEventListener('giantcore', function(e) {
    var data = JSON.parse(e.data);
    console.log(data.coreid);
    console.log(data.data);
    if (data.coreid === core1) {
        console.log("Core1");
        (data.data[0] === "1") ? $("#A4").addClass('active') : $("#A4").removeClass('active');
        (data.data[1] === "1") ? $("#A5").addClass('active') : $("#A5").removeClass('active');
        (data.data[2] === "1") ? $("#A6").addClass('active') : $("#A6").removeClass('active');
        (data.data[3] === "1") ? $("#A7").addClass('active') : $("#A7").removeClass('active');
    } else if (data.coreid === core2) {
        console.log("Core2");
        (data.data[0] === "1") ? $("#A0").addClass('active') : $("#A0").removeClass('active');
        (data.data[1] === "1") ? $("#A1").addClass('active') : $("#A1").removeClass('active');
        (data.data[2] === "1") ? $("#A2").addClass('active') : $("#A2").removeClass('active');
        (data.data[3] === "1") ? $("#A3").addClass('active') : $("#A3").removeClass('active');
    } else if (data.coreid === core3) {
        console.log("Core3");
        (data.data[0] === "1") ? $("#D4").addClass('active') : $("#D4").removeClass('active');
        (data.data[1] === "1") ? $("#D5").addClass('active') : $("#D5").removeClass('active');
        (data.data[2] === "1") ? $("#D6").addClass('active') : $("#D6").removeClass('active');
        (data.data[3] === "1") ? $("#D7").addClass('active') : $("#D7").removeClass('active');
    } else if (data.coreid === core4) {
        console.log("Core4");
        (data.data[0] === "1") ? $("#D0").addClass('active') : $("#D0").removeClass('active');
        (data.data[1] === "1") ? $("#D1").addClass('active') : $("#D1").removeClass('active');
        (data.data[2] === "1") ? $("#D2").addClass('active') : $("#D2").removeClass('active');
        (data.data[3] === "1") ? $("#D3").addClass('active') : $("#D3").removeClass('active');
    }
}, false);

var togglePin = function(target, message) {
    message = target.pin + "," + message;
    console.log(message);
    $.post( "https://api.spark.io/v1/devices/" + target.core + "/digitalwrite", {
        args: message, access_token: accessToken }, function( data ) {
        console.log( data );
    });
}

var checkPins = function() {
  console.log("Checking pins");
  $.post("https://api.spark.io/v1/devices/events/", {
    name: "checkpins",
    access_token: accessToken
  }, function(data) {
      console.log(data);
  });
}
