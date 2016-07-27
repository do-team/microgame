var unitTesting = !1,
    curlevel = 0,
    levelEditorOpened = !1;
try {
    !window.localStorage || localStorage[document.URL] !== undefined && (curlevel = localStorage[document.URL])
} catch (ex) {}
var verbose_logging = !1,
    throttle_movement = !1,
    cache_console_messages = !1,
    quittingTitleScreen = !1,
    quittingMessageScreen = !1,
    deltatime = 17,
    timer = 0,
    repeatinterval = 150,
    autotick = 0,
    autotickinterval = 0,
    winning = !1,
    againing = !1,
    againinterval = 150,
    norepeat_action = !1,
    oldflickscreendat = [],
    keybuffer = [],
    messageselected = !1,
    textImages = {},
    initLevel = {
        width: 5,
        height: 5,
        layerCount: 2,
        dat: [1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2],
        movementMask: [1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2],
        rigidGroupIndexMask: [],
        rigidMovementAppliedMask: [],
        bannedGroup: [],
        colCellContents: [],
        rowCellContents: []
    },
    level = initLevel

function stripTags(a) {
    var b = document.createElement("div");
    b.innerHTML = a;
    var c = b.textContent || b.innerText || "";
    return c
}

function consolePrint(a) {}

function consoleCacheDump(a) {}

function consoleError(a, b) {
    var c = document.getElementById("errormessage");
    a = stripTags(a), c.innerHTML += a + "<br>"
}

function logErrorNoLine(a) {
    var b = document.getElementById("errormessage");
    a = stripTags(a), b.innerHTML += a + "<br>"
}

function logBetaMessage(a) {
    var b = document.getElementById("errormessage");
    a = stripTags(a), b.innerHTML += a + "<br>"
}
var canSetHTMLColors = !0,
    canDump = !1,
    canOpenEditor = !1,
    canYoutube = !0,
    IDE = !1

var font = {
    a: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0]
    ],
    b: [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0]
    ],
    c: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0]
    ],
    d: [
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0]
    ],
    e: [
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 0, 0]
    ],
    f: [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0]
    ],
    g: [
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 0, 0]
    ],
    h: [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0]
    ],
    i: [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0]
    ],
    j: [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 0, 0, 0]
    ],
    k: [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0]
    ],
    l: [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0]
    ],
    m: [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1]
    ],
    n: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0]
    ],
    o: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0]
    ],
    p: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0]
    ],
    q: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0]
    ],
    r: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
    ],
    s: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 1, 0, 0]
    ],
    t: [
        [0, 1, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 1, 0]
    ],
    u: [
        [0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0]
    ],
    v: [
        [0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0]
    ],
    w: [
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
    ],
    x: [
        [0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0]
    ],
    y: [
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 1, 0, 0]
    ],
    z: [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 1, 1, 1, 0]
    ],
    A: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ],
    B: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ],
    C: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    D: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ],
    E: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    F: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
    ],
    G: [
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1]
    ],
    H: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ],
    I: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    J: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0]
    ],
    K: [
        [1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0],
        [1, 1, 0, 0, 0],
        [1, 0, 1, 1, 0],
        [1, 0, 0, 0, 1]
    ],
    L: [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    M: [
        [1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1]
    ],
    N: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1]
    ],
    O: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    P: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
    ],
    Q: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1]
    ],
    R: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ],
    S: [
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ],
    T: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    U: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    V: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    W: [
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
    ],
    X: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
    ],
    Y: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    Z: [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    0: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    1: [
        [1, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    2: [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    3: [
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ],
    4: [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0]
    ],
    5: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ],
    6: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ],
    7: [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0]
    ],
    8: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ],
    9: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ],
    ".": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    ",": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0]
    ],
    ";": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0]
    ],
    ":": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "?": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    "!": [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    "@": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0]
    ],
    "ÂŁ": [
        [0, 1, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    $: [
        [0, 1, 1, 1, 1],
        [1, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 1, 1, 1, 0]
    ],
    "%": [
        [1, 1, 0, 0, 1],
        [1, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ],
    "^": [
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "&": [
        [0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 0, 1, 1],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0]
    ],
    "*": [
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "(": [
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0]
    ],
    ")": [
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0]
    ],
    "+": [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    "-": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    _: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    "=": [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0]
    ],
    " ": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "{": [
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0]
    ],
    "}": [
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0]
    ],
    "[": [
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0]
    ],
    "]": [
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0]
    ],
    "'": [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    '"': [
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "/": [
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0]
    ],
    "\\": [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ],
    "|": [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    "<": [
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0]
    ],
    ">": [
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0]
    ],
    "~": [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "`": [
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "#": [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0]
    ]
}

function RC4(a) {
    this.s = new Array(256), this.i = 0, this.j = 0;
    for (var b = 0; b < 256; b++) this.s[b] = b;
    a && this.mix(a)
}

function print_call_stack() {
    var a = new Error,
        b = a.stack;
    console.log(b)
}

function RNG(a) {
    this.seed = a, a == null ? a = (Math.random() + Date.now()).toString() : typeof a == "function" ? (this.uniform = a, this.nextByte = function() {
        return ~~(this.uniform() * 256)
    }, a = null) : Object.prototype.toString.call(a) !== "[object String]" && (a = JSON.stringify(a)), this._normal = null, a ? this._state = new RC4(a) : this._state = null
}
String.prototype.getBytes = function() {
    var a = [];
    for (var b = 0; b < this.length; b++) {
        var c = this.charCodeAt(b),
            d = [];
        do d.push(c & 255), c >>= 8; while (c > 0);
        a = a.concat(d.reverse())
    }
    return a
}, RC4.prototype._swap = function(a, b) {
    var c = this.s[a];
    this.s[a] = this.s[b], this.s[b] = c
}, RC4.prototype.mix = function(a) {
    var b = a.getBytes(),
        c = 0;
    for (var d = 0; d < this.s.length; d++) c += this.s[d] + b[d % b.length], c %= 256, this._swap(d, c)
}, RC4.prototype.next = function() {
    return this.i = (this.i + 1) % 256, this.j = (this.j + this.s[this.i]) % 256, this._swap(this.i, this.j), this.s[(this.s[this.i] + this.s[this.j]) % 256]
}, RNG.prototype.nextByte = function() {
    return this._state.next()
}, RNG.prototype.uniform = function() {
    var a = 7,
        b = 0;
    for (var c = 0; c < a; c++) b *= 256, b += this.nextByte();
    return b / (Math.pow(2, a * 8) - 1)
}, RNG.prototype.random = function(a, b) {
    return a == null ? this.uniform() : (b == null && (b = a, a = 0), a + Math.floor(this.uniform() * (b - a)))
}, RNG.prototype.normal = function() {
    if (this._normal !== null) {
        var a = this._normal;
        return this._normal = null, a
    }
    var b = this.uniform() || Math.pow(2, -53),
        c = this.uniform();
    return this._normal = Math.sqrt(-2 * Math.log(b)) * Math.sin(2 * Math.PI * c), Math.sqrt(-2 * Math.log(b)) * Math.cos(2 * Math.PI * c)
}, RNG.prototype.exponential = function() {
    return -Math.log(this.uniform() || Math.pow(2, -53))
}, RNG.prototype.poisson = function(a) {
    var b = Math.exp(-(a || 1)),
        c = 0,
        d = 1;
    do c++, d *= this.uniform(); while (d > b);
    return c - 1
}, RNG.prototype.gamma = function(a) {
    var b = (a < 1 ? 1 + a : a) - 1 / 3,
        c = 1 / Math.sqrt(9 * b);
    do {
        do var d = this.normal(),
            e = Math.pow(c * d + 1, 3); while (e <= 0);
        var f = this.uniform(),
            g = Math.pow(d, 2)
    } while (f >= 1 - .0331 * g * g && Math.log(f) >= .5 * g + b * (1 - e + Math.log(e)));
    return a < 1 ? b * e * Math.exp(this.exponential() / -a) : b * e
}, RNG.roller = function(a, b) {
    var c = a.split(/(\d+)?d(\d+)([+-]\d+)?/).slice(1),
        d = parseFloat(c[0]) || 1,
        e = parseFloat(c[1]),
        f = parseFloat(c[2]) || 0;
    return b = b || new RNG,
        function() {
            var a = d + f;
            for (var c = 0; c < d; c++) a += b.random(e);
            return a
        }
}

function FastBase64_Init() {
    for (var a = 0; a < 4096; a++) FastBase64_encLookup[a] = FastBase64_chars[a >> 6] + FastBase64_chars[a & 63]
}

function FastBase64_Encode(a) {
    var b = a.length,
        c = "",
        d = 0;
    while (b > 2) n = a[d] << 16 | a[d + 1] << 8 | a[d + 2], c += FastBase64_encLookup[n >> 12] + FastBase64_encLookup[n & 4095], b -= 3, d += 3;
    if (b > 0) {
        var e = (a[d] & 252) >> 2,
            f = (a[d] & 3) << 4;
        b > 1 && (f |= (a[++d] & 240) >> 4), c += FastBase64_chars[e], c += FastBase64_chars[f];
        if (b == 2) {
            var g = (a[d++] & 15) << 2;
            g |= (a[d] & 192) >> 6, c += FastBase64_chars[g]
        }
        b == 1 && (c += "="), c += "="
    }
    return c
}

function u32ToArray(a) {
    return [a & 255, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255]
}

function u16ToArray(a) {
    return [a & 255, a >> 8 & 255]
}

function MakeRiff(a, b, c) {
    var d = [],
        e = [],
        f = [],
        g = {
            chunkId: [82, 73, 70, 70],
            chunkSize: 0,
            format: [87, 65, 86, 69],
            subChunk1Id: [102, 109, 116, 32],
            subChunk1Size: 16,
            audioFormat: 1,
            numChannels: 1,
            sampleRate: a,
            byteRate: 0,
            blockAlign: 0,
            bitsPerSample: b,
            subChunk2Id: [100, 97, 116, 97],
            subChunk2Size: 0
        };
    g.byteRate = g.sampleRate * g.numChannels * g.bitsPerSample >> 3, g.blockAlign = g.numChannels * g.bitsPerSample >> 3, g.subChunk2Size = c.length, g.chunkSize = 36 + g.subChunk2Size, e = g.chunkId.concat(u32ToArray(g.chunkSize), g.format, g.subChunk1Id, u32ToArray(g.subChunk1Size), u16ToArray(g.audioFormat), u16ToArray(g.numChannels), u32ToArray(g.sampleRate), u32ToArray(g.byteRate), u16ToArray(g.blockAlign), u16ToArray(g.bitsPerSample), g.subChunk2Id, u32ToArray(g.subChunk2Size), c), f = "data:audio/wav;base64," + FastBase64_Encode(e);
    var h = {
        dat: d,
        wav: e,
        header: g,
        dataURI: f
    };
    return h
}
var FastBase64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    FastBase64_encLookup = [];
FastBase64_Init(), typeof exports != "undefined" && (exports.RIFFWAVE = RIFFWAVE)

function Params() {
    var a = {};
    return a.wave_type = SQUARE, a.p_env_attack = 0, a.p_env_sustain = .3, a.p_env_punch = 0, a.p_env_decay = .4, a.p_base_freq = .3, a.p_freq_limit = 0, a.p_freq_ramp = 0, a.p_freq_dramp = 0, a.p_vib_strength = 0, a.p_vib_speed = 0, a.p_arp_mod = 0, a.p_arp_speed = 0, a.p_duty = 0, a.p_duty_ramp = 0, a.p_repeat_speed = 0, a.p_pha_offset = 0, a.p_pha_ramp = 0, a.p_lpf_freq = 1, a.p_lpf_ramp = 0, a.p_lpf_resonance = 0, a.p_hpf_freq = 0, a.p_hpf_ramp = 0, a.sound_vol = .5, a.sample_rate = 44100, a.bit_depth = 8, a
}

function frnd(a) {
    return seeded ? rng.uniform() * a : Math.random() * a
}

function rnd(a) {
    return seeded ? Math.floor(rng.uniform() * (a + 1)) : Math.floor(Math.random() * (a + 1))
}

function SoundEffect(a, b) {
    this._buffer = AUDIO_CONTEXT.createBuffer(1, a, b)
}

function cacheSeed(a) {
    if (a in sfxCache) return sfxCache[a];
    var b = generateFromSeed(a);
    b.sound_vol = SOUND_VOL, b.sample_rate = SAMPLE_RATE, b.bit_depth = BIT_DEPTH;
    var c = SoundEffect.generate(b);
    sfxCache[a] = c, cachedSeeds.push(a);
    while (cachedSeeds.length > CACHE_MAX) {
        var d = cachedSeeds[0];
        cachedSeeds = cachedSeeds.slice(1), delete sfxCache[d]
    }
    return c
}

function playSound(a) {
    if (unitTesting) return;
    var b = cacheSeed(a);
    b.play()
}
var SOUND_VOL = .25,
    SAMPLE_RATE = 5512,
    BIT_DEPTH = 8,
    SQUARE = 0,
    SAWTOOTH = 1,
    SINE = 2,
    NOISE = 3,
    TRIANGLE = 4,
    BREAKER = 5,
    SHAPES = ["square", "sawtooth", "sine", "noise", "triangle", "breaker"],
    AUDIO_CONTEXT;
typeof AudioContext != "undefined" ? AUDIO_CONTEXT = new AudioContext : typeof webkitAudioContext != "undefined" && (AUDIO_CONTEXT = new webkitAudioContext);
var masterVolume = 1,
    rng, seeded = !1;
pickupCoin = function() {
    var a = Params();
    a.wave_type = Math.floor(frnd(SHAPES.length)), a.wave_type === 3 && (a.wave_type = 0), a.p_base_freq = .4 + frnd(.5), a.p_env_attack = 0, a.p_env_sustain = frnd(.1), a.p_env_decay = .1 + frnd(.4), a.p_env_punch = .3 + frnd(.3);
    if (rnd(1)) {
        a.p_arp_speed = .5 + frnd(.2);
        var b = (frnd(7) | 1) + 1,
            c = b + (frnd(7) | 1) + 2;
        a.p_arp_mod = +b / +c
    }
    return a
}, laserShoot = function() {
    var a = Params();
    return a.wave_type = rnd(2), a.wave_type === SINE && rnd(1) && (a.wave_type = rnd(1)), a.wave_type = Math.floor(frnd(SHAPES.length)), a.wave_type === 3 && (a.wave_type = SQUARE), a.p_base_freq = .5 + frnd(.5), a.p_freq_limit = a.p_base_freq - .2 - frnd(.6), a.p_freq_limit < .2 && (a.p_freq_limit = .2), a.p_freq_ramp = -0.15 - frnd(.2), rnd(2) === 0 && (a.p_base_freq = .3 + frnd(.6), a.p_freq_limit = frnd(.1), a.p_freq_ramp = -0.35 - frnd(.3)), rnd(1) ? (a.p_duty = frnd(.5), a.p_duty_ramp = frnd(.2)) : (a.p_duty = .4 + frnd(.5), a.p_duty_ramp = -frnd(.7)), a.p_env_attack = 0, a.p_env_sustain = .1 + frnd(.2), a.p_env_decay = frnd(.4), rnd(1) && (a.p_env_punch = frnd(.3)), rnd(2) === 0 && (a.p_pha_offset = frnd(.2), a.p_pha_ramp = -frnd(.2)), rnd(1) && (a.p_hpf_freq = frnd(.3)), a
}, explosion = function() {
    var a = Params();
    return rnd(1) ? (a.p_base_freq = .1 + frnd(.4), a.p_freq_ramp = -0.1 + frnd(.4)) : (a.p_base_freq = .2 + frnd(.7), a.p_freq_ramp = -0.2 - frnd(.2)), a.p_base_freq *= a.p_base_freq, rnd(4) === 0 && (a.p_freq_ramp = 0), rnd(2) === 0 && (a.p_repeat_speed = .3 + frnd(.5)), a.p_env_attack = 0, a.p_env_sustain = .1 + frnd(.3), a.p_env_decay = frnd(.5), rnd(1) === 0 && (a.p_pha_offset = -0.3 + frnd(.9), a.p_pha_ramp = -frnd(.3)), a.p_env_punch = .2 + frnd(.6), rnd(1) && (a.p_vib_strength = frnd(.7), a.p_vib_speed = frnd(.6)), rnd(2) === 0 && (a.p_arp_speed = .6 + frnd(.3), a.p_arp_mod = .8 - frnd(1.6)), a
}, birdSound = function() {
    var a = Params();
    if (frnd(10) < 1) return a.wave_type = Math.floor(frnd(SHAPES.length)), a.wave_type === 3 && (a.wave_type = SQUARE), a.p_env_attack = .4304400932967592 + frnd(.2) - .1, a.p_env_sustain = .15739346034252394 + frnd(.2) - .1, a.p_env_punch = .004488201744871758 + frnd(.2) - .1, a.p_env_decay = .07478075528212291 + frnd(.2) - .1, a.p_base_freq = .9865265720147687 + frnd(.2) - .1, a.p_freq_limit = 0 + frnd(.2) - .1, a.p_freq_ramp = -0.2995018224359539 + frnd(.2) - .1, frnd(1) < .5 && (a.p_freq_ramp = .1 + frnd(.15)), a.p_freq_dramp = .004598608156964473 + frnd(.1) - .05, a.p_vib_strength = -0.2202799497929496 + frnd(.2) - .1, a.p_vib_speed = .8084998703158364 + frnd(.2) - .1, a.p_arp_mod = 0, a.p_arp_speed = 0, a.p_duty = -0.9031808754347107 + frnd(.2) - .1, a.p_duty_ramp = -0.8128699999808343 + frnd(.2) - .1, a.p_repeat_speed = .601486018931999 + frnd(.2) - .1, a.p_pha_offset = -0.9424902314367765 + frnd(.2) - .1, a.p_pha_ramp = -0.1055482222272056 + frnd(.2) - .1, a.p_lpf_freq = .9989765717851521 + frnd(.2) - .1, a.p_lpf_ramp = -0.25051720626043017 + frnd(.2) - .1, a.p_lpf_resonance = .32777871505494693 + frnd(.2) - .1, a.p_hpf_freq = .0023548750981756753 + frnd(.2) - .1, a.p_hpf_ramp = -0.002375673204842568 + frnd(.2) - .1, a;
    if (frnd(10) < 1) return a.wave_type = Math.floor(frnd(SHAPES.length)), a.wave_type === 3 && (a.wave_type = SQUARE), a.p_env_attack = .5277795946672003 + frnd(.2) - .1, a.p_env_sustain = .18243733568468432 + frnd(.2) - .1, a.p_env_punch = -0.020159754546840117 + frnd(.2) - .1, a.p_env_decay = .1561353422051903 + frnd(.2) - .1, a.p_base_freq = .9028855606533718 + frnd(.2) - .1, a.p_freq_limit = -0.008842787837148716, a.p_freq_ramp = -0.1, a.p_freq_dramp = -0.012891241489551925, a.p_vib_strength = -0.17923136138403065 + frnd(.2) - .1, a.p_vib_speed = .908263385610142 + frnd(.2) - .1, a.p_arp_mod = .41690153355414894 + frnd(.2) - .1, a.p_arp_speed = .0010766233195860704 + frnd(.2) - .1, a.p_duty = -0.8735363011184684 + frnd(.2) - .1, a.p_duty_ramp = -0.7397985366747507 + frnd(.2) - .1, a.p_repeat_speed = .0591789344172107 + frnd(.2) - .1, a.p_pha_offset = -0.9961184222777699 + frnd(.2) - .1, a.p_pha_ramp = -0.08234769395850523 + frnd(.2) - .1, a.p_lpf_freq = .9412475115697335 + frnd(.2) - .1, a.p_lpf_ramp = -0.18261358925834958 + frnd(.2) - .1, a.p_lpf_resonance = .24541438107389477 + frnd(.2) - .1, a.p_hpf_freq = -0.01831940280978611 + frnd(.2) - .1, a.p_hpf_ramp = -0.03857383633171346 + frnd(.2) - .1, a;
    if (frnd(10) < 1) return a.wave_type = Math.floor(frnd(SHAPES.length)), a.wave_type === 3 && (a.wave_type = SQUARE), a.p_env_attack = .4304400932967592 + frnd(.2) - .1, a.p_env_sustain = .15739346034252394 + frnd(.2) - .1, a.p_env_punch = .004488201744871758 + frnd(.2) - .1, a.p_env_decay = .07478075528212291 + frnd(.2) - .1, a.p_base_freq = .9865265720147687 + frnd(.2) - .1, a.p_freq_limit = 0 + frnd(.2) - .1, a.p_freq_ramp = -0.2995018224359539 + frnd(.2) - .1, a.p_freq_dramp = .004598608156964473 + frnd(.2) - .1, a.p_vib_strength = -0.2202799497929496 + frnd(.2) - .1, a.p_vib_speed = .8084998703158364 + frnd(.2) - .1, a.p_arp_mod = -0.46410459213693644 + frnd(.2) - .1, a.p_arp_speed = -0.10955361249587248 + frnd(.2) - .1, a.p_duty = -0.9031808754347107 + frnd(.2) - .1, a.p_duty_ramp = -0.8128699999808343 + frnd(.2) - .1, a.p_repeat_speed = .7014860189319991 + frnd(.2) - .1, a.p_pha_offset = -0.9424902314367765 + frnd(.2) - .1, a.p_pha_ramp = -0.1055482222272056 + frnd(.2) - .1, a.p_lpf_freq = .9989765717851521 + frnd(.2) - .1, a.p_lpf_ramp = -0.25051720626043017 + frnd(.2) - .1, a.p_lpf_resonance = .32777871505494693 + frnd(.2) - .1, a.p_hpf_freq = .0023548750981756753 + frnd(.2) - .1, a.p_hpf_ramp = -0.002375673204842568 + frnd(.2) - .1, a;
    if (frnd(5) > 1) return a.wave_type = Math.floor(frnd(SHAPES.length)), a.wave_type === 3 && (a.wave_type = SQUARE), rnd(1) ? (a.p_arp_mod = .2697849293151393 + frnd(.2) - .1, a.p_arp_speed = -0.3131172257760948 + frnd(.2) - .1, a.p_base_freq = .8090588299313949 + frnd(.2) - .1, a.p_duty = -0.6210022920964955 + frnd(.2) - .1, a.p_duty_ramp = -0.00043441813553182567 + frnd(.2) - .1, a.p_env_attack = .004321877246874195 + frnd(.2) - .1, a.p_env_decay = .1 + frnd(.2) - .1, a.p_env_punch = .061737781504416146 + frnd(.2) - .1, a.p_env_sustain = .4987252564798832 + frnd(.2) - .1, a.p_freq_dramp = .31700340314222614 + frnd(.2) - .1, a.p_freq_limit = 0 + frnd(.2) - .1, a.p_freq_ramp = -0.163380391341416 + frnd(.2) - .1, a.p_hpf_freq = .4709005021145149 + frnd(.2) - .1, a.p_hpf_ramp = .6924667290539194 + frnd(.2) - .1, a.p_lpf_freq = .8351398631384511 + frnd(.2) - .1, a.p_lpf_ramp = .36616557192873134 + frnd(.2) - .1, a.p_lpf_resonance = -0.08685777111664439 + frnd(.2) - .1, a.p_pha_offset = -0.036084571580025544 + frnd(.2) - .1, a.p_pha_ramp = -0.014806445085568108 + frnd(.2) - .1, a.p_repeat_speed = -0.8094368475518489 + frnd(.2) - .1, a.p_vib_speed = .4496665457171294 + frnd(.2) - .1, a.p_vib_strength = .23413762515532424 + frnd(.2) - .1) : (a.p_arp_mod = -0.35697118026766184 + frnd(.2) - .1, a.p_arp_speed = .3581140690559588 + frnd(.2) - .1, a.p_base_freq = 1.3260897696157528 + frnd(.2) - .1, a.p_duty = -0.30984900436710694 + frnd(.2) - .1, a.p_duty_ramp = -0.0014374759133411626 + frnd(.2) - .1, a.p_env_attack = .3160357835682254 + frnd(.2) - .1, a.p_env_decay = .1 + frnd(.2) - .1, a.p_env_punch = .24323114016870148 + frnd(.2) - .1, a.p_env_sustain = .4 + frnd(.2) - .1, a.p_freq_dramp = .2866475886237244 + frnd(.2) - .1, a.p_freq_limit = 0 + frnd(.2) - .1, a.p_freq_ramp = -0.10956352368742976 + frnd(.2) - .1, a.p_hpf_freq = .20772718017889846 + frnd(.2) - .1, a.p_hpf_ramp = .1564090637378835 + frnd(.2) - .1, a.p_lpf_freq = .6021372770637031 + frnd(.2) - .1, a.p_lpf_ramp = .24016227139979027 + frnd(.2) - .1, a.p_lpf_resonance = -0.08787383821160144 + frnd(.2) - .1, a.p_pha_offset = -0.381597686151701 + frnd(.2) - .1, a.p_pha_ramp = -0.0002481687661373495 + frnd(.2) - .1, a.p_repeat_speed = .07812112809425686 + frnd(.2) - .1, a.p_vib_speed = -0.13648848579133943 + frnd(.2) - .1, a.p_vib_strength = .0018874158972302657 + frnd(.2) - .1), a;
    a.wave_type = Math.floor(frnd(SHAPES.length));
    if (a.wave_type === 1 || a.wave_type === 3) a.wave_type = 2;
    return a.p_base_freq = .85 + frnd(.15), a.p_freq_ramp = .3 + frnd(.15), a.p_env_attack = 0 + frnd(.09), a.p_env_sustain = .2 + frnd(.3), a.p_env_decay = 0 + frnd(.1), a.p_duty = frnd(2) - 1, a.p_duty_ramp = Math.pow(frnd(2) - 1, 3), a.p_repeat_speed = .5 + frnd(.1), a.p_pha_offset = -0.3 + frnd(.9), a.p_pha_ramp = -frnd(.3), a.p_arp_speed = .4 + frnd(.6), a.p_arp_mod = .8 + frnd(.1), a.p_lpf_resonance = frnd(2) - 1, a.p_lpf_freq = 1 - Math.pow(frnd(1), 3), a.p_lpf_ramp = Math.pow(frnd(2) - 1, 3), a.p_lpf_freq < .1 && a.p_lpf_ramp < -0.05 && (a.p_lpf_ramp = -a.p_lpf_ramp), a.p_hpf_freq = Math.pow(frnd(1), 5), a.p_hpf_ramp = Math.pow(frnd(2) - 1, 5), a
}, pushSound = function() {
    var a = Params();
    return a.wave_type = Math.floor(frnd(SHAPES.length)), a.wave_type === 2 && a.wave_type++, a.wave_type === 0 && (a.wave_type = NOISE), a.p_base_freq = .1 + frnd(.4), a.p_freq_ramp = .05 + frnd(.2), a.p_env_attack = .01 + frnd(.09), a.p_env_sustain = .01 + frnd(.09), a.p_env_decay = .01 + frnd(.09), a.p_repeat_speed = .3 + frnd(.5), a.p_pha_offset = -0.3 + frnd(.9), a.p_pha_ramp = -frnd(.3), a.p_arp_speed = .6 + frnd(.3), a.p_arp_mod = .8 - frnd(1.6), a
}, powerUp = function() {
    var a = Params();
    return rnd(1) ? a.wave_type = SAWTOOTH : a.p_duty = frnd(.6), a.wave_type = Math.floor(frnd(SHAPES.length)), a.wave_type === 3 && (a.wave_type = SQUARE), rnd(1) ? (a.p_base_freq = .2 + frnd(.3), a.p_freq_ramp = .1 + frnd(.4), a.p_repeat_speed = .4 + frnd(.4)) : (a.p_base_freq = .2 + frnd(.3), a.p_freq_ramp = .05 + frnd(.2), rnd(1) && (a.p_vib_strength = frnd(.7), a.p_vib_speed = frnd(.6))), a.p_env_attack = 0, a.p_env_sustain = frnd(.4), a.p_env_decay = .1 + frnd(.4), a
}, hitHurt = function() {
    return result = Params(), result.wave_type = rnd(2), result.wave_type === SINE && (result.wave_type = NOISE), result.wave_type === SQUARE && (result.p_duty = frnd(.6)), result.wave_type = Math.floor(frnd(SHAPES.length)), result.p_base_freq = .2 + frnd(.6), result.p_freq_ramp = -0.3 - frnd(.4), result.p_env_attack = 0, result.p_env_sustain = frnd(.1), result.p_env_decay = .1 + frnd(.2), rnd(1) && (result.p_hpf_freq = frnd(.3)), result
}, jump = function() {
    return result = Params(), result.wave_type = SQUARE, result.wave_type = Math.floor(frnd(SHAPES.length)), result.wave_type === 3 && (result.wave_type = SQUARE), result.p_duty = frnd(.6), result.p_base_freq = .3 + frnd(.3), result.p_freq_ramp = .1 + frnd(.2), result.p_env_attack = 0, result.p_env_sustain = .1 + frnd(.3), result.p_env_decay = .1 + frnd(.2), rnd(1) && (result.p_hpf_freq = frnd(.3)), rnd(1) && (result.p_lpf_freq = 1 - frnd(.6)), result
}, blipSelect = function() {
    return result = Params(), result.wave_type = rnd(1), result.wave_type = Math.floor(frnd(SHAPES.length)), result.wave_type === 3 && (result.wave_type = rnd(1)), result.wave_type === SQUARE && (result.p_duty = frnd(.6)), result.p_base_freq = .2 + frnd(.4), result.p_env_attack = 0, result.p_env_sustain = .1 + frnd(.1), result.p_env_decay = frnd(.2), result.p_hpf_freq = .1, result
}, random = function() {
    return result = Params(), result.wave_type = Math.floor(frnd(SHAPES.length)), result.p_base_freq = Math.pow(frnd(2) - 1, 2), rnd(1) && (result.p_base_freq = Math.pow(frnd(2) - 1, 3) + .5), result.p_freq_limit = 0, result.p_freq_ramp = Math.pow(frnd(2) - 1, 5), result.p_base_freq > .7 && result.p_freq_ramp > .2 && (result.p_freq_ramp = -result.p_freq_ramp), result.p_base_freq < .2 && result.p_freq_ramp < -0.05 && (result.p_freq_ramp = -result.p_freq_ramp), result.p_freq_dramp = Math.pow(frnd(2) - 1, 3), result.p_duty = frnd(2) - 1, result.p_duty_ramp = Math.pow(frnd(2) - 1, 3), result.p_vib_strength = Math.pow(frnd(2) - 1, 3), result.p_vib_speed = frnd(2) - 1, result.p_env_attack = Math.pow(frnd(2) - 1, 3), result.p_env_sustain = Math.pow(frnd(2) - 1, 2), result.p_env_decay = frnd(2) - 1, result.p_env_punch = Math.pow(frnd(.8), 2), result.p_env_attack + result.p_env_sustain + result.p_env_decay < .2 && (result.p_env_sustain += .2 + frnd(.3), result.p_env_decay += .2 + frnd(.3)), result.p_lpf_resonance = frnd(2) - 1, result.p_lpf_freq = 1 - Math.pow(frnd(1), 3), result.p_lpf_ramp = Math.pow(frnd(2) - 1, 3), result.p_lpf_freq < .1 && result.p_lpf_ramp < -0.05 && (result.p_lpf_ramp = -result.p_lpf_ramp), result.p_hpf_freq = Math.pow(frnd(1), 5), result.p_hpf_ramp = Math.pow(frnd(2) - 1, 5), result.p_pha_offset = Math.pow(frnd(2) - 1, 3), result.p_pha_ramp = Math.pow(frnd(2) - 1, 3), result.p_repeat_speed = frnd(2) - 1, result.p_arp_speed = frnd(2) - 1, result.p_arp_mod = frnd(2) - 1, result
};
var generators = [pickupCoin, laserShoot, explosion, powerUp, hitHurt, jump, blipSelect, pushSound, random, birdSound],
    generatorNames = ["pickupCoin", "laserShoot", "explosion", "powerUp", "hitHurt", "jump", "blipSelect", "pushSound", "random", "birdSound"];
generateFromSeed = function(a) {
    rng = new RNG(a / 100 | 0);
    var b = a % 100,
        c = generators[b % generators.length];
    seeded = !0;
    var d = c();
    return d.seed = a, seeded = !1, d
}, SoundEffect.prototype.getBuffer = function() {
    return this._buffer.getChannelData(0)
}, SoundEffect.prototype.play = function() {
    var a = AUDIO_CONTEXT.createBufferSource(),
        b = AUDIO_CONTEXT.createBiquadFilter(),
        c = AUDIO_CONTEXT.createBiquadFilter(),
        d = AUDIO_CONTEXT.createBiquadFilter();
    a.buffer = this._buffer, a.connect(b), b.frequency.value = 1600, c.frequency.value = 1600, d.frequency.value = 1600, b.connect(c), c.connect(d), d.connect(AUDIO_CONTEXT.destination);
    var e = AUDIO_CONTEXT.currentTime;
    typeof a.start != "undefined" ? a.start(e) : a.noteOn(e)
}, SoundEffect.MIN_SAMPLE_RATE = 22050, typeof AUDIO_CONTEXT == "undefined" && (SoundEffect = function(b, c) {
    this._sample_rate = c, this._buffer = new Array(b), this._audioElement = null
}, SoundEffect.prototype.getBuffer = function() {
    return this._audioElement = null, this._buffer
}, SoundEffect.prototype.play = function() {
    if (this._audioElement) this._audioElement.cloneNode(!1).play();
    else {
        for (var a = 0; a < this._buffer.length; a++) this._buffer[a] = 255 & Math.floor(128 * Math.max(0, Math.min(this._buffer[a] + 1, 2)));
        var b = MakeRiff(this._sample_rate, BIT_DEPTH, this._buffer);
        this._audioElement = new Audio, this._audioElement.src = b.dataURI, this._audioElement.play()
    }
}, SoundEffect.MIN_SAMPLE_RATE = 1), SoundEffect.generate = function(a) {
    function b() {
        c = 0, d = 100 / (a.p_base_freq * a.p_base_freq + .001), e = Math.floor(d), f = 100 / (a.p_freq_limit * a.p_freq_limit + .001), g = 1 - Math.pow(a.p_freq_ramp, 3) * .01, h = -Math.pow(a.p_freq_dramp, 3) * 1e-6, i = .5 - a.p_duty * .5, j = -a.p_duty_ramp * 5e-5, a.p_arp_mod >= 0 ? k = 1 - Math.pow(a.p_arp_mod, 2) * .9 : k = 1 + Math.pow(a.p_arp_mod, 2) * 10, l = 0, m = Math.floor(Math.pow(1 - a.p_arp_speed, 2) * 2e4 + 32), a.p_arp_speed == 1 && (m = 0)
    }
    var c, d, e, f, g, h, i, j, k, l, m;
    b();
    var n = 0,
        o = 0,
        p = Math.pow(a.p_lpf_freq, 3) * .1,
        q = 1 + a.p_lpf_ramp * 1e-4,
        r = 5 / (1 + Math.pow(a.p_lpf_resonance, 2) * 20) * (.01 + p);
    r > .8 && (r = .8);
    var s = 0,
        t = Math.pow(a.p_hpf_freq, 2) * .1,
        u = 1 + a.p_hpf_ramp * 3e-4,
        v = 0,
        w = Math.pow(a.p_vib_speed, 2) * .01,
        x = a.p_vib_strength * .5,
        y = 0,
        z = 0,
        A = 0,
        B = [Math.floor(a.p_env_attack * a.p_env_attack * 1e5), Math.floor(a.p_env_sustain * a.p_env_sustain * 1e5), Math.floor(a.p_env_decay * a.p_env_decay * 1e5)],
        C = B[0] + B[1] + B[2],
        D = 0,
        E = Math.pow(a.p_pha_offset, 2) * 1020;
    a.p_pha_offset < 0 && (E = -E);
    var F = Math.pow(a.p_pha_ramp, 2) * 1;
    a.p_pha_ramp < 0 && (F = -F);
    var G = Math.abs(Math.floor(E)),
        H = 0,
        I = [];
    for (var J = 0; J < 1024; ++J) I[J] = 0;
    var K = [];
    for (var J = 0; J < 32; ++J) K[J] = Math.random() * 2 - 1;
    var L = Math.floor(Math.pow(1 - a.p_repeat_speed, 2) * 2e4 + 32);
    a.p_repeat_speed == 0 && (L = 0);
    var M = 2 * a.sound_vol,
        M = Math.exp(a.sound_vol) - 1,
        N = 0,
        O = 0,
        P = 0,
        Q = Math.floor(44100 / a.sample_rate),
        R = 0,
        S = Math.ceil(C / Q),
        T = !1,
        U;
    a.sample_rate < SoundEffect.MIN_SAMPLE_RATE ? U = new SoundEffect(4 * S, SoundEffect.MIN_SAMPLE_RATE) : U = new SoundEffect(S, a.sample_rate);
    var V = U.getBuffer();
    for (var W = 0;; ++W) {
        L != 0 && ++c >= L && b(), m != 0 && W >= m && (m = 0, d *= k), g += h, d *= g, d > f && (d = f, a.p_freq_limit > 0 && (T = !0));
        var X = d;
        x > 0 && (v += w, X = d * (1 + Math.sin(v) * x)), e = Math.floor(X), e < 8 && (e = 8), i += j, i < 0 && (i = 0), i > .5 && (i = .5), A++, A > B[z] && (A = 0, z++, z === 3 && (T = !0)), z === 0 ? y = A / B[0] : z === 1 ? y = 1 + Math.pow(1 - A / B[1], 1) * 2 * a.p_env_punch : y = 1 - A / B[2], E += F, G = Math.abs(Math.floor(E)), G > 1023 && (G = 1023), u != 0 && (t *= u, t < 1e-5 && (t = 1e-5), t > .1 && (t = .1));
        var Y = 0;
        for (var Z = 0; Z < 8; ++Z) {
            var $ = 0;
            D++;
            if (D >= e) {
                D %= e;
                if (a.wave_type === NOISE)
                    for (var J = 0; J < 32; ++J) K[J] = Math.random() * 2 - 1
            }
            var _ = D / e;
            if (a.wave_type === SQUARE) _ < i ? $ = .5 : $ = -0.5;
            else if (a.wave_type === SAWTOOTH) $ = 1 - _ * 2;
            else if (a.wave_type === SINE) $ = Math.sin(_ * 2 * Math.PI);
            else if (a.wave_type === NOISE) $ = K[Math.floor(D * 32 / e)];
            else if (a.wave_type === TRIANGLE) $ = Math.abs(1 - _ * 2) - 1;
            else if (a.wave_type === BREAKER) $ = Math.abs(1 - _ * _ * 2) - 1;
            else throw new Exception("bad wave type! " + a.wave_type);
            var ba = n;
            p *= q, p < 0 && (p = 0), p > .1 && (p = .1), a.p_lpf_freq != 1 ? (o += ($ - n) * p, o -= o * r) : (n = $, o = 0), n += o, s += n - ba, s -= s * t, $ = s, I[H & 1023] = $, $ += I[H - G + 1024 & 1023], H = H + 1 & 1023, Y += $ * y
        }
        O += Y;
        if (++P >= Q) P = 0, Y = O / Q, O = 0;
        else continue;
        Y = Y / 8 * masterVolume, Y *= M, V[R++] = Y, a.sample_rate < SoundEffect.MIN_SAMPLE_RATE && (V[R++] = Y, V[R++] = Y, V[R++] = Y);
        if (T) {
            for (; R < S; R++) a.sample_rate < SoundEffect.MIN_SAMPLE_RATE && (V[R++] = 0, V[R++] = 0, V[R++] = 0), V[R] = 0;
            break
        }
    }
    return U
};
if (typeof exports != "undefined") {
    var RIFFWAVE = require("./riffwave").RIFFWAVE;
    exports.Params = Params, exports.generate = generate
}
var sfxCache = {},
    cachedSeeds = [],
    CACHE_MAX = 50;

(function(a) {
    if (typeof exports == "object" && typeof module == "object") module.exports = a();
    else {
        if (typeof define == "function" && define.amd) return define([], a);
        this.CodeMirror = a()
    }
})(function() {
    function z(a, c) {
        if (!(this instanceof z)) return new z(a, c);
        this.options = c = c || {};
        for (var d in dY) c.hasOwnProperty(d) || (c[d] = dY[d]);
        M(c);
        var e = c.value;
        typeof e == "string" && (e = new fq(e, c.mode)), this.doc = e;
        var f = this.display = new A(a, e);
        f.wrapper.CodeMirror = this, J(this), H(this), c.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), c.autofocus && !r && cP(this), this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            cutIncoming: !1,
            draggingText: !1,
            highlight: new gl
        }, b && setTimeout(gw(cO, this, !0), 20), cS(this);
        var g = this;
        cy(this, function() {
            g.curOp.forceUpdate = !0, fu(g, e), c.autofocus && !r || gH() == f.input ? setTimeout(gw(dt, g), 20) : du(g);
            for (var a in dZ) dZ.hasOwnProperty(a) && dZ[a](g, c[a], d_);
            for (var b = 0; b < ed.length; ++b) ed[b](g)
        })
    }

    function A(a, b) {
        var d = this,
            e = d.input = gC("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
        h ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), q && (e.style.border = "1px solid black"), e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", "false"), d.inputDiv = gC("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), d.scrollbarH = gC("div", [gC("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar"), d.scrollbarV = gC("div", [gC("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), d.scrollbarFiller = gC("div", null, "CodeMirror-scrollbar-filler"), d.gutterFiller = gC("div", null, "CodeMirror-gutter-filler"), d.lineDiv = gC("div", null, "CodeMirror-code"), d.selectionDiv = gC("div", null, null, "position: relative; z-index: 1"), d.cursorDiv = gC("div", null, "CodeMirror-cursors"), d.measure = gC("div", null, "CodeMirror-measure"), d.lineMeasure = gC("div", null, "CodeMirror-measure"), d.lineSpace = gC("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv], null, "position: relative; outline: none"), d.mover = gC("div", [gC("div", [d.lineSpace], "CodeMirror-lines")], null, "position: relative"), d.sizer = gC("div", [d.mover], "CodeMirror-sizer"), d.heightForcer = gC("div", null, null, "position: absolute; height: " + gg + "px; width: 1px;"), d.gutters = gC("div", null, "CodeMirror-gutters"), d.lineGutter = null, d.scroller = gC("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll"), d.scroller.setAttribute("tabIndex", "-1"), d.wrapper = gC("div", [d.inputDiv, d.scrollbarH, d.scrollbarV, d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror"), c && (d.gutters.style.zIndex = -1, d.scroller.style.paddingRight = 0), q && (e.style.width = "0px"), h || (d.scroller.draggable = !0), m && (d.inputDiv.style.height = "1px", d.inputDiv.style.position = "absolute"), c && (d.scrollbarH.style.minHeight = d.scrollbarV.style.minWidth = "18px"), a.appendChild ? a.appendChild(d.wrapper) : a(d.wrapper), d.viewFrom = d.viewTo = b.first, d.view = [], d.externalMeasured = null, d.viewOffset = 0, d.lastSizeC = 0, d.updateLineNumbers = null, d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null, d.prevInput = "", d.alignWidgets = !1, d.pollingFast = !1, d.poll = new gl, d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null, d.inaccurateSelection = !1, d.maxLine = null, d.maxLineLength = 0, d.maxLineChanged = !1, d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null, d.shift = !1
    }

    function B(a) {
        a.doc.mode = z.getMode(a.options, a.doc.modeOption), C(a)
    }

    function C(a) {
        a.doc.iter(function(a) {
            a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null)
        }), a.doc.frontier = a.doc.first, bR(a, 100), a.state.modeGen++, a.curOp && cE(a)
    }

    function D(a) {
        a.options.lineWrapping ? (a.display.wrapper.className += " CodeMirror-wrap", a.display.sizer.style.minWidth = "") : (a.display.wrapper.className = a.display.wrapper.className.replace(" CodeMirror-wrap", ""), L(a)), F(a), cE(a), ch(a), setTimeout(function() {
            O(a)
        }, 100)
    }

    function E(a) {
        var b = ct(a.display),
            c = a.options.lineWrapping,
            d = c && Math.max(5, a.display.scroller.clientWidth / cu(a.display) - 3);
        return function(e) {
            if (eQ(a.doc, e)) return 0;
            var f = 0;
            if (e.widgets)
                for (var g = 0; g < e.widgets.length; g++) e.widgets[g].height && (f += e.widgets[g].height);
            return c ? f + (Math.ceil(e.text.length / d) || 1) * b : f + b
        }
    }

    function F(a) {
        var b = a.doc,
            c = E(a);
        b.iter(function(a) {
            var b = c(a);
            b != a.height && fy(a, b)
        })
    }

    function G(a) {
        var b = ei[a.options.keyMap],
            c = b.style;
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (c ? " cm-keymap-" + c : "")
    }

    function H(a) {
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), ch(a)
    }

    function I(a) {
        J(a), cE(a), setTimeout(function() {
            Q(a)
        }, 20)
    }

    function J(a) {
        var b = a.display.gutters,
            c = a.options.gutters;
        gE(b);
        for (var d = 0; d < c.length; ++d) {
            var e = c[d],
                f = b.appendChild(gC("div", null, "CodeMirror-gutter " + e));
            e == "CodeMirror-linenumbers" && (a.display.lineGutter = f, f.style.width = (a.display.lineNumWidth || 1) + "px")
        }
        b.style.display = d ? "" : "none";
        var g = b.offsetWidth;
        a.display.sizer.style.marginLeft = g + "px", d && (a.display.scrollbarH.style.left = a.options.fixedGutter ? g + "px" : 0)
    }

    function K(a) {
        if (a.height == 0) return 0;
        var b = a.text.length,
            c, d = a;
        while (c = eJ(d)) {
            var e = c.find(0, !0);
            d = e.from.line, b += e.from.ch - e.to.ch
        }
        d = a;
        while (c = eK(d)) {
            var e = c.find(0, !0);
            b -= d.text.length - e.from.ch, d = e.to.line, b += d.text.length - e.to.ch
        }
        return b
    }

    function L(a) {
        var b = a.display,
            c = a.doc;
        b.maxLine = fv(c, c.first), b.maxLineLength = K(b.maxLine), b.maxLineChanged = !0, c.iter(function(a) {
            var c = K(a);
            c > b.maxLineLength && (b.maxLineLength = c, b.maxLine = a)
        })
    }

    function M(a) {
        var b = gs(a.gutters, "CodeMirror-linenumbers");
        b == -1 && a.lineNumbers ? a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]) : b > -1 && !a.lineNumbers && (a.gutters = a.gutters.slice(0), a.gutters.splice(b, 1))
    }

    function N(a) {
        var b = a.display.scroller;
        return {
            clientHeight: b.clientHeight,
            barHeight: a.display.scrollbarV.clientHeight,
            scrollWidth: b.scrollWidth,
            clientWidth: b.clientWidth,
            barWidth: a.display.scrollbarH.clientWidth,
            docHeight: Math.round(a.doc.height + bW(a.display))
        }
    }

    function O(a, b) {
        b || (b = N(a));
        var c = a.display,
            d = b.docHeight + gg,
            e = b.scrollWidth > b.clientWidth,
            f = d > b.clientHeight;
        f ? (c.scrollbarV.style.display = "block", c.scrollbarV.style.bottom = e ? gK(c.measure) + "px" : "0", c.scrollbarV.firstChild.style.height = Math.max(0, d - b.clientHeight + (b.barHeight || c.scrollbarV.clientHeight)) + "px") : (c.scrollbarV.style.display = "", c.scrollbarV.firstChild.style.height = "0"), e ? (c.scrollbarH.style.display = "block", c.scrollbarH.style.right = f ? gK(c.measure) + "px" : "0", c.scrollbarH.firstChild.style.width = b.scrollWidth - b.clientWidth + (b.barWidth || c.scrollbarH.clientWidth) + "px") : (c.scrollbarH.style.display = "", c.scrollbarH.firstChild.style.width = "0"), e && f ? (c.scrollbarFiller.style.display = "block", c.scrollbarFiller.style.height = c.scrollbarFiller.style.width = gK(c.measure) + "px") : c.scrollbarFiller.style.display = "", e && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (c.gutterFiller.style.display = "block", c.gutterFiller.style.height = gK(c.measure) + "px", c.gutterFiller.style.width = c.gutters.offsetWidth + "px") : c.gutterFiller.style.display = "";
        if (n && gK(c.measure) === 0) {
            c.scrollbarV.style.minWidth = c.scrollbarH.style.minHeight = o ? "18px" : "12px";
            var g = function(b) {
                fW(b) != c.scrollbarV && fW(b) != c.scrollbarH && cz(a, cV)(b)
            };
            fY(c.scrollbarV, "mousedown", g), fY(c.scrollbarH, "mousedown", g)
        }
    }

    function P(a, b, c) {
        var d = c && c.top != null ? c.top : a.scroller.scrollTop;
        d = Math.floor(d - bV(a));
        var e = c && c.bottom != null ? c.bottom : d + a.wrapper.clientHeight,
            f = fA(b, d),
            g = fA(b, e);
        if (c && c.ensure) {
            var h = c.ensure.from.line,
                i = c.ensure.to.line;
            if (h < f) return {
                from: h,
                to: fA(b, fB(fv(b, h)) + a.wrapper.clientHeight)
            };
            if (Math.min(i, b.lastLine()) >= g) return {
                from: fA(b, fB(fv(b, i)) - a.wrapper.clientHeight),
                to: i
            }
        }
        return {
            from: f,
            to: g
        }
    }

    function Q(a) {
        var b = a.display,
            c = b.view;
        if (!b.alignWidgets && (!b.gutters.firstChild || !a.options.fixedGutter)) return;
        var d = T(b) - b.scroller.scrollLeft + a.doc.scrollLeft,
            e = b.gutters.offsetWidth,
            f = d + "px";
        for (var g = 0; g < c.length; g++)
            if (!c[g].hidden) {
                a.options.fixedGutter && c[g].gutter && (c[g].gutter.style.left = f);
                var h = c[g].alignable;
                if (h)
                    for (var i = 0; i < h.length; i++) h[i].style.left = f
            }
        a.options.fixedGutter && (b.gutters.style.left = d + e + "px")
    }

    function R(a) {
        if (!a.options.lineNumbers) return !1;
        var b = a.doc,
            c = S(a.options, b.first + b.size - 1),
            d = a.display;
        if (c.length != d.lineNumChars) {
            var e = d.measure.appendChild(gC("div", [gC("div", c)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                f = e.firstChild.offsetWidth,
                g = e.offsetWidth - f;
            d.lineGutter.style.width = "", d.lineNumInnerWidth = Math.max(f, d.lineGutter.offsetWidth - g), d.lineNumWidth = d.lineNumInnerWidth + g, d.lineNumChars = d.lineNumInnerWidth ? c.length : -1, d.lineGutter.style.width = d.lineNumWidth + "px";
            var h = d.gutters.offsetWidth;
            return d.scrollbarH.style.left = a.options.fixedGutter ? h + "px" : 0, d.sizer.style.marginLeft = h + "px", !0
        }
        return !1
    }

    function S(a, b) {
        return String(a.lineNumberFormatter(b + a.firstLineNumber))
    }

    function T(a) {
        return a.scroller.getBoundingClientRect().left - a.sizer.getBoundingClientRect().left
    }

    function U(a, b, c) {
        var d = a.display.viewFrom,
            e = a.display.viewTo,
            f, g = P(a.display, a.doc, b);
        for (var h = !0;; h = !1) {
            var i = a.display.scroller.clientWidth;
            if (!V(a, g, c)) break;
            f = !0, a.display.maxLineChanged && !a.options.lineWrapping && W(a);
            var j = N(a);
            bN(a), X(a, j), O(a, j);
            if (h && a.options.lineWrapping && i != a.display.scroller.clientWidth) {
                c = !0;
                continue
            }
            c = !1, b && b.top != null && (b = {
                top: Math.min(j.docHeight - gg - j.clientHeight, b.top)
            }), g = P(a.display, a.doc, b);
            if (g.from >= a.display.viewFrom && g.to <= a.display.viewTo) break
        }
        return a.display.updateLineNumbers = null, f && (gb(a, "update", a), (a.display.viewFrom != d || a.display.viewTo != e) && gb(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo)), f
    }

    function V(a, b, c) {
        var d = a.display,
            e = a.doc;
        if (!d.wrapper.offsetWidth) {
            cG(a);
            return
        }
        if (!c && b.from >= d.viewFrom && b.to <= d.viewTo && cK(a) == 0) return;
        R(a) && cG(a);
        var f = $(a),
            g = e.first + e.size,
            h = Math.max(b.from - a.options.viewportMargin, e.first),
            i = Math.min(g, b.to + a.options.viewportMargin);
        d.viewFrom < h && h - d.viewFrom < 20 && (h = Math.max(e.first, d.viewFrom)), d.viewTo > i && d.viewTo - i < 20 && (i = Math.min(g, d.viewTo)), y && (h = eO(a.doc, h), i = eP(a.doc, i));
        var j = h != d.viewFrom || i != d.viewTo || d.lastSizeC != d.wrapper.clientHeight;
        cJ(a, h, i), d.viewOffset = fB(fv(a.doc, d.viewFrom)), a.display.mover.style.top = d.viewOffset + "px";
        var k = cK(a);
        if (!j && k == 0 && !c) return;
        var l = gH();
        return k > 4 && (d.lineDiv.style.display = "none"), _(a, d.updateLineNumbers, f), k > 4 && (d.lineDiv.style.display = ""), l && gH() != l && l.offsetHeight && l.focus(), gE(d.cursorDiv), gE(d.selectionDiv), j && (d.lastSizeC = d.wrapper.clientHeight, bR(a, 400)), Y(a), !0
    }

    function W(a) {
        var b = a.display,
            c = b_(a, b.maxLine, b.maxLine.text.length).left;
        b.maxLineChanged = !1;
        var d = Math.max(0, c + 3),
            e = Math.max(0, b.sizer.offsetLeft + d + gg - b.scroller.clientWidth);
        b.sizer.style.minWidth = d + "px", e < a.doc.scrollLeft && df(a, Math.min(b.scroller.scrollLeft, e), !0)
    }

    function X(a, b) {
        a.display.sizer.style.minHeight = a.display.heightForcer.style.top = b.docHeight + "px", a.display.gutters.style.height = Math.max(b.docHeight, b.clientHeight - gg) + "px"
    }

    function Y(a) {
        var b = a.display,
            d = b.lineDiv.offsetTop;
        for (var e = 0; e < b.view.length; e++) {
            var f = b.view[e],
                g;
            if (f.hidden) continue;
            if (c) {
                var h = f.node.offsetTop + f.node.offsetHeight;
                g = h - d, d = h
            } else {
                var i = f.node.getBoundingClientRect();
                g = i.bottom - i.top
            }
            var j = f.line.height - g;
            g < 2 && (g = ct(b));
            if (j > .001 || j < -0.001) {
                fy(f.line, g), Z(f.line);
                if (f.rest)
                    for (var k = 0; k < f.rest.length; k++) Z(f.rest[k])
            }
        }
    }

    function Z(a) {
        if (a.widgets)
            for (var b = 0; b < a.widgets.length; ++b) a.widgets[b].height = a.widgets[b].node.offsetHeight
    }

    function $(a) {
        var b = a.display,
            c = {},
            d = {};
        for (var e = b.gutters.firstChild, f = 0; e; e = e.nextSibling, ++f) c[a.options.gutters[f]] = e.offsetLeft, d[a.options.gutters[f]] = e.offsetWidth;
        return {
            fixedPos: T(b),
            gutterTotalWidth: b.gutters.offsetWidth,
            gutterLeft: c,
            gutterWidth: d,
            wrapperWidth: b.wrapper.clientWidth
        }
    }

    function _(a, b, c) {
        function i(b) {
            var c = b.nextSibling;
            return h && s && a.display.currentWheelTarget == b ? b.style.display = "none" : b.parentNode.removeChild(b), c
        }
        var d = a.display,
            e = a.options.lineNumbers,
            f = d.lineDiv,
            g = f.firstChild,
            j = d.view,
            k = d.viewFrom;
        for (var l = 0; l < j.length; l++) {
            var m = j[l];
            if (!m.hidden)
                if (!m.node) {
                    var n = bi(a, m, k, c);
                    f.insertBefore(n, g)
                } else {
                    while (g != m.node) g = i(g);
                    var o = e && b != null && b <= k && m.lineNumber;
                    m.changes && (gs(m.changes, "gutter") > -1 && (o = !1), ba(a, m, k, c)), o && (gE(m.lineNumber), m.lineNumber.appendChild(document.createTextNode(S(a.options, k)))), g = m.node.nextSibling
                }
            k += m.size
        }
        while (g) g = i(g)
    }

    function ba(a, b, c, d) {
        for (var e = 0; e < b.changes.length; e++) {
            var f = b.changes[e];
            f == "text" ? be(a, b) : f == "gutter" ? bg(a, b, c, d) : f == "class" ? bf(b) : f == "widget" && bh(b, d)
        }
        b.changes = null
    }

    function bb(a) {
        return a.node == a.text && (a.node = gC("div", null, null, "position: relative"), a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text), a.node.appendChild(a.text), c && (a.node.style.zIndex = 2)), a.node
    }

    function bc(a) {
        var b = a.bgClass ? a.bgClass + " " + (a.line.bgClass || "") : a.line.bgClass;
        b && (b += " CodeMirror-linebackground");
        if (a.background) b ? a.background.className = b : (a.background.parentNode.removeChild(a.background), a.background = null);
        else if (b) {
            var c = bb(a);
            a.background = c.insertBefore(gC("div", null, b), c.firstChild)
        }
    }

    function bd(a, b) {
        var c = a.display.externalMeasured;
        return c && c.line == b.line ? (a.display.externalMeasured = null, b.measure = c.measure, c.built) : fe(a, b)
    }

    function be(a, b) {
        var c = b.text.className,
            d = bd(a, b);
        b.text == b.node && (b.node = d.pre), b.text.parentNode.replaceChild(d.pre, b.text), b.text = d.pre, d.bgClass != b.bgClass || d.textClass != b.textClass ? (b.bgClass = d.bgClass, b.textClass = d.textClass, bf(b)) : c && (b.text.className = c)
    }

    function bf(a) {
        bc(a), a.line.wrapClass ? bb(a).className = a.line.wrapClass : a.node != a.text && (a.node.className = "");
        var b = a.textClass ? a.textClass + " " + (a.line.textClass || "") : a.line.textClass;
        a.text.className = b || ""
    }

    function bg(a, b, c, d) {
        b.gutter && (b.node.removeChild(b.gutter), b.gutter = null);
        var e = b.line.gutterMarkers;
        if (a.options.lineNumbers || e) {
            var f = bb(b),
                g = b.gutter = f.insertBefore(gC("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px"), b.text);
            a.options.lineNumbers && (!e || !e["CodeMirror-linenumbers"]) && (b.lineNumber = g.appendChild(gC("div", S(a.options, c), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + d.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.display.lineNumInnerWidth + "px")));
            if (e)
                for (var h = 0; h < a.options.gutters.length; ++h) {
                    var i = a.options.gutters[h],
                        j = e.hasOwnProperty(i) && e[i];
                    j && g.appendChild(gC("div", [j], "CodeMirror-gutter-elt", "left: " + d.gutterLeft[i] + "px; width: " + d.gutterWidth[i] + "px"))
                }
        }
    }

    function bh(a, b) {
        a.alignable && (a.alignable = null);
        for (var c = a.node.firstChild, d; c; c = d) {
            var d = c.nextSibling;
            c.className == "CodeMirror-linewidget" && a.node.removeChild(c)
        }
        bj(a, b)
    }

    function bi(a, b, c, d) {
        var e = bd(a, b);
        return b.text = b.node = e.pre, e.bgClass && (b.bgClass = e.bgClass), e.textClass && (b.textClass = e.textClass), bf(b), bg(a, b, c, d), bj(b, d), b.node
    }

    function bj(a, b) {
        bk(a.line, a, b, !0);
        if (a.rest)
            for (var c = 0; c < a.rest.length; c++) bk(a.rest[c], a, b, !1)
    }

    function bk(a, b, c, d) {
        if (!a.widgets) return;
        var e = bb(b);
        for (var f = 0, g = a.widgets; f < g.length; ++f) {
            var h = g[f],
                i = gC("div", [h.node], "CodeMirror-linewidget");
            h.handleMouseEvents || (i.ignoreEvents = !0), bl(h, i, b, c), d && h.above ? e.insertBefore(i, b.gutter || b.text) : e.appendChild(i), gb(h, "redraw")
        }
    }

    function bl(a, b, c, d) {
        if (a.noHScroll) {
            (c.alignable || (c.alignable = [])).push(b);
            var e = d.wrapperWidth;
            b.style.left = d.fixedPos + "px", a.coverGutter || (e -= d.gutterTotalWidth, b.style.paddingLeft = d.gutterTotalWidth + "px"), b.style.width = e + "px"
        }
        a.coverGutter && (b.style.zIndex = 5, b.style.position = "relative", a.noHScroll || (b.style.marginLeft = -d.gutterTotalWidth + "px"))
    }

    function bo(a) {
        return bm(a.line, a.ch)
    }

    function bp(a, b) {
        return bn(a, b) < 0 ? b : a
    }

    function bq(a, b) {
        return bn(a, b) < 0 ? a : b
    }

    function br(a, b) {
        this.ranges = a, this.primIndex = b
    }

    function bs(a, b) {
        this.anchor = a, this.head = b
    }

    function bt(a, b) {
        var c = a[b];
        a.sort(function(a, b) {
            return bn(a.from(), b.from())
        }), b = gs(a, c);
        for (var d = 1; d < a.length; d++) {
            var e = a[d],
                f = a[d - 1];
            if (bn(f.to(), e.from()) >= 0) {
                var g = bq(f.from(), e.from()),
                    h = bp(f.to(), e.to()),
                    i = f.empty() ? e.from() == e.head : f.from() == f.head;
                d <= b && --b, a.splice(--d, 2, new bs(i ? h : g, i ? g : h))
            }
        }
        return new br(a, b)
    }

    function bu(a, b) {
        return new br([new bs(a, b || a)], 0)
    }

    function bv(a, b) {
        return Math.max(a.first, Math.min(b, a.first + a.size - 1))
    }

    function bw(a, b) {
        if (b.line < a.first) return bm(a.first, 0);
        var c = a.first + a.size - 1;
        return b.line > c ? bm(c, fv(a, c).text.length) : bx(b, fv(a, b.line).text.length)
    }

    function bx(a, b) {
        var c = a.ch;
        return c == null || c > b ? bm(a.line, b) : c < 0 ? bm(a.line, 0) : a
    }

    function by(a, b) {
        return b >= a.first && b < a.first + a.size
    }

    function bz(a, b) {
        for (var c = [], d = 0; d < b.length; d++) c[d] = bw(a, b[d]);
        return c
    }

    function bA(a, b, c, d) {
        if (a.cm && a.cm.display.shift || a.extend) {
            var e = b.anchor;
            if (d) {
                var f = bn(c, e) < 0;
                f != bn(d, e) < 0 ? (e = c, c = d) : f != bn(c, d) < 0 && (c = d)
            }
            return new bs(e, c)
        }
        return new bs(d || c, c)
    }

    function bB(a, b, c, d) {
        bH(a, new br([bA(a, a.sel.primary(), b, c)], 0), d)
    }

    function bC(a, b, c) {
        for (var d = [], e = 0; e < a.sel.ranges.length; e++) d[e] = bA(a, a.sel.ranges[e], b[e], null);
        var f = bt(d, a.sel.primIndex);
        bH(a, f, c)
    }

    function bD(a, b, c, d) {
        var e = a.sel.ranges.slice(0);
        e[b] = c, bH(a, bt(e, a.sel.primIndex), d)
    }

    function bE(a, b, c, d) {
        bH(a, bu(b, c), d)
    }

    function bF(a, b) {
        var c = {
            ranges: b.ranges,
            update: function(b) {
                this.ranges = [];
                for (var c = 0; c < b.length; c++) this.ranges[c] = new bs(bw(a, b[c].anchor), bw(a, b[c].head))
            }
        };
        return f$(a, "beforeSelectionChange", a, c), a.cm && f$(a.cm, "beforeSelectionChange", a.cm, c), c.ranges != b.ranges ? bt(c.ranges, c.ranges.length - 1) : b
    }

    function bG(a, b, c) {
        var d = a.history.done,
            e = gq(d);
        e && e.ranges ? (d[d.length - 1] = b, bI(a, b, c)) : bH(a, b, c)
    }

    function bH(a, b, c) {
        bI(a, b, c), fJ(a, a.sel, a.cm ? a.cm.curOp.id : NaN, c)
    }

    function bI(a, b, c) {
        if (ge(a, "beforeSelectionChange") || a.cm && ge(a.cm, "beforeSelectionChange")) b = bF(a, b);
        var d = bn(b.primary().head, a.sel.primary().head) < 0 ? -1 : 1;
        bJ(a, bL(a, b, d, !0)), (!c || c.scroll !== !1) && a.cm && dQ(a.cm)
    }

    function bJ(a, b) {
        if (b.equals(a.sel)) return;
        a.sel = b, a.cm && (a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = a.cm.curOp.cursorActivity = !0), gb(a, "cursorActivity", a)
    }

    function bK(a) {
        bJ(a, bL(a, a.sel, null, !1), gi)
    }

    function bL(a, b, c, d) {
        var e;
        for (var f = 0; f < b.ranges.length; f++) {
            var g = b.ranges[f],
                h = bM(a, g.anchor, c, d),
                i = bM(a, g.head, c, d);
            if (e || h != g.anchor || i != g.head) e || (e = b.ranges.slice(0, f)), e[f] = new bs(h, i)
        }
        return e ? bt(e, b.primIndex) : b
    }

    function bM(a, b, c, d) {
        var e = !1,
            f = b,
            g = c || 1;
        a.cantEdit = !1;
        a: for (;;) {
            var h = fv(a, f.line);
            if (h.markedSpans)
                for (var i = 0; i < h.markedSpans.length; ++i) {
                    var j = h.markedSpans[i],
                        k = j.marker;
                    if ((j.from == null || (k.inclusiveLeft ? j.from <= f.ch : j.from < f.ch)) && (j.to == null || (k.inclusiveRight ? j.to >= f.ch : j.to > f.ch))) {
                        if (d) {
                            f$(k, "beforeCursorEnter");
                            if (k.explicitlyCleared) {
                                if (!h.markedSpans) break;
                                --i;
                                continue
                            }
                        }
                        if (!k.atomic) continue;
                        var l = k.find(g < 0 ? -1 : 1);
                        if (bn(l, f) == 0) {
                            l.ch += g, l.ch < 0 ? l.line > a.first ? l = bw(a, bm(l.line - 1)) : l = null : l.ch > h.text.length && (l.line < a.first + a.size - 1 ? l = bm(l.line + 1, 0) : l = null);
                            if (!l) {
                                if (e) return d ? (a.cantEdit = !0, bm(a.first, 0)) : bM(a, b, c, !0);
                                e = !0, l = b, g = -g
                            }
                        }
                        f = l;
                        continue a
                    }
                }
            return f
        }
    }

    function bN(a) {
        var b = a.display,
            c = a.doc,
            d = document.createDocumentFragment(),
            e = document.createDocumentFragment();
        for (var f = 0; f < c.sel.ranges.length; f++) {
            var g = c.sel.ranges[f],
                h = g.empty();
            (h || a.options.showCursorWhenSelecting) && bO(a, g, d), h || bP(a, g, e)
        }
        if (a.options.moveInputWithCursor) {
            var i = cn(a, c.sel.primary().head, "div"),
                j = b.wrapper.getBoundingClientRect(),
                k = b.lineDiv.getBoundingClientRect(),
                l = Math.max(0, Math.min(b.wrapper.clientHeight - 10, i.top + k.top - j.top)),
                m = Math.max(0, Math.min(b.wrapper.clientWidth - 10, i.left + k.left - j.left));
            b.inputDiv.style.top = l + "px", b.inputDiv.style.left = m + "px"
        }
        gF(b.cursorDiv, d), gF(b.selectionDiv, e)
    }

    function bO(a, b, c) {
        var d = cn(a, b.head, "div"),
            e = c.appendChild(gC("div", " ", "CodeMirror-cursor"));
        e.style.left = d.left + "px", e.style.top = d.top + "px", e.style.height = Math.max(0, d.bottom - d.top) * a.options.cursorHeight + "px";
        if (d.other) {
            var f = c.appendChild(gC("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            f.style.display = "", f.style.left = d.other.left + "px", f.style.top = d.other.top + "px", f.style.height = (d.other.bottom - d.other.top) * .85 + "px"
        }
    }

    function bP(a, b, c) {
        function j(a, b, c, d) {
            b < 0 && (b = 0), f.appendChild(gC("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px; top: " + b + "px; width: " + (c == null ? i - a : c) + "px; height: " + (d - b) + "px"))
        }

        function k(b, c, d) {
            function m(c, d) {
                return cm(a, bm(b, c), "div", f, d)
            }
            var f = fv(e, b),
                g = f.text.length,
                k, l;
            return gT(fC(f), c || 0, d == null ? g : d, function(a, b, e) {
                var f = m(a, "left"),
                    n, o, p;
                if (a == b) n = f, o = p = f.left;
                else {
                    n = m(b - 1, "right");
                    if (e == "rtl") {
                        var q = f;
                        f = n, n = q
                    }
                    o = f.left, p = n.right
                }
                c == null && a == 0 && (o = h), n.top - f.top > 3 && (j(o, f.top, null, f.bottom), o = h, f.bottom < n.top && j(o, f.bottom, null, n.top)), d == null && b == g && (p = i);
                if (!k || f.top < k.top || f.top == k.top && f.left < k.left) k = f;
                if (!l || n.bottom > l.bottom || n.bottom == l.bottom && n.right > l.right) l = n;
                o < h + 1 && (o = h), j(o, n.top, p - o, n.bottom)
            }), {
                start: k,
                end: l
            }
        }
        var d = a.display,
            e = a.doc,
            f = document.createDocumentFragment(),
            g = bX(a.display),
            h = g.left,
            i = d.lineSpace.offsetWidth - g.right,
            l = b.from(),
            m = b.to();
        if (l.line == m.line) k(l.line, l.ch, m.ch);
        else {
            var n = fv(e, l.line),
                o = fv(e, m.line),
                p = eM(n) == eM(o),
                q = k(l.line, l.ch, p ? n.text.length + 1 : null).end,
                r = k(m.line, p ? 0 : null, m.ch).start;
            p && (q.top < r.top - 2 ? (j(q.right, q.top, null, q.bottom), j(h, r.top, r.left, r.bottom)) : j(q.right, q.top, r.left - q.right, q.bottom)), q.bottom < r.top && j(h, q.bottom, null, r.top)
        }
        c.appendChild(f)
    }

    function bQ(a) {
        if (!a.state.focused) return;
        var b = a.display;
        clearInterval(b.blinker);
        var c = !0;
        b.cursorDiv.style.visibility = "", a.options.cursorBlinkRate > 0 && (b.blinker = setInterval(function() {
            b.cursorDiv.style.visibility = (c = !c) ? "" : "hidden"
        }, a.options.cursorBlinkRate))
    }

    function bR(a, b) {
        a.doc.mode.startState && a.doc.frontier < a.display.viewTo && a.state.highlight.set(b, gw(bS, a))
    }

    function bS(a) {
        var b = a.doc;
        b.frontier < b.first && (b.frontier = b.first);
        if (b.frontier >= a.display.viewTo) return;
        var c = +(new Date) + a.options.workTime,
            d = ef(b.mode, bU(a, b.frontier));
        cy(a, function() {
            b.iter(b.frontier, Math.min(b.first + b.size, a.display.viewTo + 500), function(e) {
                if (b.frontier >= a.display.viewFrom) {
                    var f = e.styles;
                    e.styles = e$(a, e, d, !0);
                    var g = !f || f.length != e.styles.length;
                    for (var h = 0; !g && h < f.length; ++h) g = f[h] != e.styles[h];
                    g && cF(a, b.frontier, "text"), e.stateAfter = ef(b.mode, d)
                } else fa(a, e.text, d), e.stateAfter = b.frontier % 5 == 0 ? ef(b.mode, d) : null;
                ++b.frontier;
                if (+(new Date) > c) return bR(a, a.options.workDelay), !0
            })
        })
    }

    function bT(a, b, c) {
        var d, e, f = a.doc,
            g = c ? -1 : b - (a.doc.mode.innerMode ? 1e3 : 100);
        for (var h = b; h > g; --h) {
            if (h <= f.first) return f.first;
            var i = fv(f, h - 1);
            if (i.stateAfter && (!c || h <= f.frontier)) return h;
            var j = gm(i.text, null, a.options.tabSize);
            if (e == null || d > j) e = h - 1, d = j
        }
        return e
    }

    function bU(a, b, c) {
        var d = a.doc,
            e = a.display;
        if (!d.mode.startState) return !0;
        var f = bT(a, b, c),
            g = f > d.first && fv(d, f - 1).stateAfter;
        return g ? g = ef(d.mode, g) : g = eg(d.mode), d.iter(f, b, function(c) {
            fa(a, c.text, g);
            var h = f == b - 1 || f % 5 == 0 || f >= e.viewFrom && f < e.viewTo;
            c.stateAfter = h ? ef(d.mode, g) : null, ++f
        }), c && (d.frontier = f), g
    }

    function bV(a) {
        return a.lineSpace.offsetTop
    }

    function bW(a) {
        return a.mover.offsetHeight - a.lineSpace.offsetHeight
    }

    function bX(a) {
        if (a.cachedPaddingH) return a.cachedPaddingH;
        var b = gF(a.measure, gC("pre", "x")),
            c = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle;
        return a.cachedPaddingH = {
            left: parseInt(c.paddingLeft),
            right: parseInt(c.paddingRight)
        }
    }

    function bY(a, b, c) {
        var d = a.options.lineWrapping,
            e = d && a.display.scroller.clientWidth;
        if (!b.measure.heights || d && b.measure.width != e) {
            var f = b.measure.heights = [];
            if (d) {
                b.measure.width = e;
                var g = b.text.firstChild.getClientRects();
                for (var h = 0; h < g.length - 1; h++) {
                    var i = g[h],
                        j = g[h + 1];
                    Math.abs(i.bottom - j.bottom) > 2 && f.push((i.bottom + j.top) / 2 - c.top)
                }
            }
            f.push(c.bottom - c.top)
        }
    }

    function bZ(a, b, c) {
        if (a.line == b) return {
            map: a.measure.map,
            cache: a.measure.cache
        };
        for (var d = 0; d < a.rest.length; d++)
            if (a.rest[d] == b) return {
                map: a.measure.maps[d],
                cache: a.measure.caches[d]
            };
        for (var d = 0; d < a.rest.length; d++)
            if (fz(a.rest[d]) > c) return {
                map: a.measure.maps[d],
                cache: a.measure.caches[d],
                before: !0
            }
    }

    function b$(a, b) {
        b = eM(b);
        var c = fz(b),
            d = a.display.externalMeasured = new cC(a.doc, b, c);
        d.lineN = c;
        var e = d.built = fe(a, d);
        return d.text = e.pre, gF(a.display.lineMeasure, e.pre), d
    }

    function b_(a, b, c, d) {
        return cc(a, cb(a, b), c, d)
    }

    function ca(a, b) {
        if (b >= a.display.viewFrom && b < a.display.viewTo) return a.display.view[cH(a, b)];
        var c = a.display.externalMeasured;
        if (c && b >= c.lineN && b < c.lineN + c.size) return c
    }

    function cb(a, b) {
        var c = fz(b),
            d = ca(a, c);
        d && !d.text ? d = null : d && d.changes && ba(a, d, c, $(a)), d || (d = b$(a, b));
        var e = bZ(d, b, c);
        return {
            line: b,
            view: d,
            rect: null,
            map: e.map,
            cache: e.cache,
            before: e.before,
            hasHeights: !1
        }
    }

    function cc(a, b, c, d) {
        b.before && (c = -1);
        var e = c + (d || ""),
            f;
        return b.cache.hasOwnProperty(e) ? f = b.cache[e] : (b.rect || (b.rect = b.view.text.getBoundingClientRect()), b.hasHeights || (bY(a, b.view, b.rect), b.hasHeights = !0), f = ce(a, b, c, d), f.bogus || (b.cache[e] = f)), {
            left: f.left,
            right: f.right,
            top: f.top,
            bottom: f.bottom
        }
    }

    function ce(a, b, c, e) {
        var f = b.map,
            h, i, j, k;
        for (var l = 0; l < f.length; l += 3) {
            var m = f[l],
                n = f[l + 1];
            if (c < m) i = 0, j = 1, k = "left";
            else if (c < n) i = c - m, j = i + 1;
            else if (l == f.length - 3 || c == n && f[l + 3] > c) j = n - m, i = j - 1, c >= n && (k = "right");
            if (i != null) {
                h = f[l + 2], m == n && e == (h.insertLeft ? "left" : "right") && (k = e);
                if (e == "left" && i == 0)
                    while (l && f[l - 2] == f[l - 3] && f[l - 1].insertLeft) h = f[(l -= 3) + 2], k = "left";
                if (e == "right" && i == n - m)
                    while (l < f.length - 3 && f[l + 3] == f[l + 4] && !f[l + 5].insertLeft) h = f[(l += 3) + 2], k = "right";
                break
            }
        }
        var o;
        if (h.nodeType == 3) {
            while (i && gB(b.line.text.charAt(m + i))) --i;
            while (m + j < n && gB(b.line.text.charAt(m + j))) ++j;
            if (d && i == 0 && j == n - m) o = h.parentNode.getBoundingClientRect();
            else if (g && a.options.lineWrapping) {
                var p = gD(h, i, j).getClientRects();
                p.length ? o = p[e == "right" ? p.length - 1 : 0] : o = cd
            } else o = gD(h, i, j).getBoundingClientRect()
        } else {
            i > 0 && (k = e = "right");
            var p;
            a.options.lineWrapping && (p = h.getClientRects()).length > 1 ? o = p[e == "right" ? p.length - 1 : 0] : o = h.getBoundingClientRect()
        }
        if (d && !i && (!o || !o.left && !o.right)) {
            var q = h.parentNode.getClientRects()[0];
            q ? o = {
                left: q.left,
                right: q.left + cu(a.display),
                top: q.top,
                bottom: q.bottom
            } : o = cd
        }
        var r, s = (o.bottom + o.top) / 2 - b.rect.top,
            t = b.view.measure.heights;
        for (var l = 0; l < t.length - 1; l++)
            if (s < t[l]) break;
        r = l ? t[l - 1] : 0, s = t[l];
        var u = {
            left: (k == "right" ? o.right : o.left) - b.rect.left,
            right: (k == "left" ? o.left : o.right) - b.rect.left,
            top: r,
            bottom: s
        };
        return !o.left && !o.right && (u.bogus = !0), u
    }

    function cf(a) {
        if (a.measure) {
            a.measure.cache = {}, a.measure.heights = null;
            if (a.rest)
                for (var b = 0; b < a.rest.length; b++) a.measure.caches[b] = {}
        }
    }

    function cg(a) {
        a.display.externalMeasure = null, gE(a.display.lineMeasure);
        for (var b = 0; b < a.display.view.length; b++) cf(a.display.view[b])
    }

    function ch(a) {
        cg(a), a.display.cachedCharWidth = a.display.cachedTextHeight = a.display.cachedPaddingH = null, a.options.lineWrapping || (a.display.maxLineChanged = !0), a.display.lineNumChars = null
    }

    function ci() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function cj() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function ck(a, b, c, d) {
        if (b.widgets)
            for (var e = 0; e < b.widgets.length; ++e)
                if (b.widgets[e].above) {
                    var f = eU(b.widgets[e]);
                    c.top += f, c.bottom += f
                }
        if (d == "line") return c;
        d || (d = "local");
        var g = fB(b);
        d == "local" ? g += bV(a.display) : g -= a.display.viewOffset;
        if (d == "page" || d == "window") {
            var h = a.display.lineSpace.getBoundingClientRect();
            g += h.top + (d == "window" ? 0 : cj());
            var i = h.left + (d == "window" ? 0 : ci());
            c.left += i, c.right += i
        }
        return c.top += g, c.bottom += g, c
    }

    function cl(a, b, c) {
        if (c == "div") return b;
        var d = b.left,
            e = b.top;
        if (c == "page") d -= ci(), e -= cj();
        else if (c == "local" || !c) {
            var f = a.display.sizer.getBoundingClientRect();
            d += f.left, e += f.top
        }
        var g = a.display.lineSpace.getBoundingClientRect();
        return {
            left: d - g.left,
            top: e - g.top
        }
    }

    function cm(a, b, c, d, e) {
        return d || (d = fv(a.doc, b.line)), ck(a, d, b_(a, d, b.ch, e), c)
    }

    function cn(a, b, c, d, e) {
        function f(b, f) {
            var g = cc(a, e, b, f ? "right" : "left");
            return f ? g.left = g.right : g.right = g.left, ck(a, d, g, c)
        }

        function g(a, b) {
            var c = h[b],
                d = c.level % 2;
            return a == gU(c) && b && c.level < h[b - 1].level ? (c = h[--b], a = gV(c) - (c.level % 2 ? 0 : 1), d = !0) : a == gV(c) && b < h.length - 1 && c.level < h[b + 1].level && (c = h[++b], a = gU(c) - c.level % 2, d = !1), d && a == c.to && a > c.from ? f(a - 1) : f(a, d)
        }
        d = d || fv(a.doc, b.line), e || (e = cb(a, d));
        var h = fC(d),
            i = b.ch;
        if (!h) return f(i);
        var j = ha(h, i),
            k = g(i, j);
        return g_ != null && (k.other = g(i, g_)), k
    }

    function co(a, b) {
        var c = 0,
            b = bw(a.doc, b);
        a.options.lineWrapping || (c = cu(a.display) * b.ch);
        var d = fv(a.doc, b.line),
            e = fB(d) + bV(a.display);
        return {
            left: c,
            right: c,
            top: e,
            bottom: e + d.height
        }
    }

    function cp(a, b, c, d) {
        var e = bm(a, b);
        return e.xRel = d, c && (e.outside = !0), e
    }

    function cq(a, b, c) {
        var d = a.doc;
        c += a.display.viewOffset;
        if (c < 0) return cp(d.first, 0, !0, -1);
        var e = fA(d, c),
            f = d.first + d.size - 1;
        if (e > f) return cp(d.first + d.size - 1, fv(d, f).text.length, !0, 1);
        b < 0 && (b = 0);
        var g = fv(d, e);
        for (;;) {
            var h = cr(a, g, e, b, c),
                i = eK(g),
                j = i && i.find(0, !0);
            if (i && (h.ch > j.from.ch || h.ch == j.from.ch && h.xRel > 0)) e = fz(g = j.to.line);
            else return h
        }
    }

    function cr(a, b, c, d, e) {
        function j(d) {
            var e = cn(a, bm(c, d), "line", b, i);
            return g = !0, f > e.bottom ? e.left - h : f < e.top ? e.left + h : (g = !1, e.left)
        }
        var f = e - fB(b),
            g = !1,
            h = 2 * a.display.wrapper.clientWidth,
            i = cb(a, b),
            k = fC(b),
            l = b.text.length,
            m = gW(b),
            n = gX(b),
            o = j(m),
            p = g,
            q = j(n),
            r = g;
        if (d > q) return cp(c, n, r, 1);
        for (;;) {
            if (k ? n == m || n == hc(b, m, 1) : n - m <= 1) {
                var s = d < o || d - o <= q - d ? m : n,
                    t = d - (s == m ? o : q);
                while (gB(b.text.charAt(s))) ++s;
                var u = cp(c, s, s == m ? p : r, t < -1 ? -1 : t > 1 ? 1 : 0);
                return u
            }
            var v = Math.ceil(l / 2),
                w = m + v;
            if (k) {
                w = m;
                for (var x = 0; x < v; ++x) w = hc(b, w, 1)
            }
            var y = j(w);
            if (y > d) {
                n = w, q = y;
                if (r = g) q += 1e3;
                l = v
            } else m = w, o = y, p = g, l -= v
        }
    }

    function ct(a) {
        if (a.cachedTextHeight != null) return a.cachedTextHeight;
        if (cs == null) {
            cs = gC("pre");
            for (var b = 0; b < 49; ++b) cs.appendChild(document.createTextNode("x")), cs.appendChild(gC("br"));
            cs.appendChild(document.createTextNode("x"))
        }
        gF(a.measure, cs);
        var c = cs.offsetHeight / 50;
        return c > 3 && (a.cachedTextHeight = c), gE(a.measure), c || 1
    }

    function cu(a) {
        if (a.cachedCharWidth != null) return a.cachedCharWidth;
        var b = gC("span", "xxxxxxxxxx"),
            c = gC("pre", [b]);
        gF(a.measure, c);
        var d = b.getBoundingClientRect(),
            e = (d.right - d.left) / 10;
        return e > 2 && (a.cachedCharWidth = e), e || 10
    }

    function cw(a) {
        a.curOp = {
            viewChanged: !1,
            startHeight: a.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivity: !1,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            id: ++cv
        }, ga++ || (f_ = [])
    }

    function cx(a) {
        var b = a.curOp,
            c = a.doc,
            d = a.display;
        a.curOp = null, b.updateMaxLine && L(a);
        if (b.viewChanged || b.forceUpdate || b.scrollTop != null || b.scrollToPos && (b.scrollToPos.from.line < d.viewFrom || b.scrollToPos.to.line >= d.viewTo) || d.maxLineChanged && a.options.lineWrapping) {
            var e = U(a, {
                top: b.scrollTop,
                ensure: b.scrollToPos
            }, b.forceUpdate);
            a.display.scroller.offsetHeight && (a.doc.scrollTop = a.display.scroller.scrollTop)
        }!e && b.selectionChanged && bN(a), !e && b.startHeight != a.doc.height && O(a);
        if (b.scrollTop != null && d.scroller.scrollTop != b.scrollTop) {
            var f = Math.max(0, Math.min(d.scroller.scrollHeight - d.scroller.clientHeight, b.scrollTop));
            d.scroller.scrollTop = d.scrollbarV.scrollTop = c.scrollTop = f
        }
        if (b.scrollLeft != null && d.scroller.scrollLeft != b.scrollLeft) {
            var g = Math.max(0, Math.min(d.scroller.scrollWidth - d.scroller.clientWidth, b.scrollLeft));
            d.scroller.scrollLeft = d.scrollbarH.scrollLeft = c.scrollLeft = g, Q(a)
        }
        if (b.scrollToPos) {
            var h = dM(a, bw(a.doc, b.scrollToPos.from), bw(a.doc, b.scrollToPos.to), b.scrollToPos.margin);
            b.scrollToPos.isCursor && a.state.focused && dL(a, h)
        }
        b.selectionChanged && bQ(a), a.state.focused && b.updateInput && cO(a, b.typing);
        var i = b.maybeHiddenMarkers,
            j = b.maybeUnhiddenMarkers;
        if (i)
            for (var k = 0; k < i.length; ++k) i[k].lines.length || f$(i[k], "hide");
        if (j)
            for (var k = 0; k < j.length; ++k) j[k].lines.length && f$(j[k], "unhide");
        var l;
        --ga || (l = f_, f_ = null);
        if (b.changeObjs) {
            for (var k = 0; k < b.changeObjs.length; k++) f$(a, "change", a, b.changeObjs[k]);
            f$(a, "changes", a, b.changeObjs)
        }
        b.cursorActivity && f$(a, "cursorActivity", a);
        if (l)
            for (var k = 0; k < l.length; ++k) l[k]()
    }

    function cy(a, b) {
        if (a.curOp) return b();
        cw(a);
        try {
            return b()
        } finally {
            cx(a)
        }
    }

    function cz(a, b) {
        return function() {
            if (a.curOp) return b.apply(a, arguments);
            cw(a);
            try {
                return b.apply(a, arguments)
            } finally {
                cx(a)
            }
        }
    }

    function cA(a) {
        return function() {
            if (this.curOp) return a.apply(this, arguments);
            cw(this);
            try {
                return a.apply(this, arguments)
            } finally {
                cx(this)
            }
        }
    }

    function cB(a) {
        return function() {
            var b = this.cm;
            if (!b || b.curOp) return a.apply(this, arguments);
            cw(b);
            try {
                return a.apply(this, arguments)
            } finally {
                cx(b)
            }
        }
    }

    function cC(a, b, c) {
        this.line = b, this.rest = eN(b), this.size = this.rest ? fz(gq(this.rest)) - c + 1 : 1, this.node = this.text = null, this.hidden = eQ(a, b)
    }

    function cD(a, b, c) {
        var d = [],
            e;
        for (var f = b; f < c; f = e) {
            var g = new cC(a.doc, fv(a.doc, f), f);
            e = f + g.size, d.push(g)
        }
        return d
    }

    function cE(a, b, c, d) {
        b == null && (b = a.doc.first), c == null && (c = a.doc.first + a.doc.size), d || (d = 0);
        var e = a.display;
        d && c < e.viewTo && (e.updateLineNumbers == null || e.updateLineNumbers > b) && (e.updateLineNumbers = b), a.curOp.viewChanged = !0;
        if (b >= e.viewTo) y && eO(a.doc, b) < e.viewTo && cG(a);
        else if (c <= e.viewFrom) y && eP(a.doc, c + d) > e.viewFrom ? cG(a) : (e.viewFrom += d, e.viewTo += d);
        else if (b <= e.viewFrom && c >= e.viewTo) cG(a);
        else if (b <= e.viewFrom) {
            var f = cI(a, c, c + d, 1);
            f ? (e.view = e.view.slice(f.index), e.viewFrom = f.lineN, e.viewTo += d) : cG(a)
        } else if (c >= e.viewTo) {
            var f = cI(a, b, b, -1);
            f ? (e.view = e.view.slice(0, f.index), e.viewTo = f.lineN) : cG(a)
        } else {
            var g = cI(a, b, b, -1),
                h = cI(a, c, c + d, 1);
            g && h ? (e.view = e.view.slice(0, g.index).concat(cD(a, g.lineN, h.lineN)).concat(e.view.slice(h.index)), e.viewTo += d) : cG(a)
        }
        var i = e.externalMeasured;
        i && (c < i.lineN ? i.lineN += d : b < i.lineN + i.size && (e.externalMeasured = null))
    }

    function cF(a, b, c) {
        a.curOp.viewChanged = !0;
        var d = a.display,
            e = a.display.externalMeasured;
        e && b >= e.lineN && b < e.lineN + e.size && (d.externalMeasured = null);
        if (b < d.viewFrom || b >= d.viewTo) return;
        var f = d.view[cH(a, b)];
        if (f.node == null) return;
        var g = f.changes || (f.changes = []);
        gs(g, c) == -1 && g.push(c)
    }

    function cG(a) {
        a.display.viewFrom = a.display.viewTo = a.doc.first, a.display.view = [], a.display.viewOffset = 0
    }

    function cH(a, b) {
        if (b >= a.display.viewTo) return null;
        b -= a.display.viewFrom;
        if (b < 0) return null;
        var c = a.display.view;
        for (var d = 0; d < c.length; d++) {
            b -= c[d].size;
            if (b < 0) return d
        }
    }

    function cI(a, b, c, d) {
        var e = cH(a, b),
            f, g = a.display.view;
        if (!y) return {
            index: e,
            lineN: c
        };
        for (var h = 0, i = a.display.viewFrom; h < e; h++) i += g[h].size;
        if (i != b) {
            if (d > 0) {
                if (e == g.length - 1) return null;
                f = i + g[e].size - b, e++
            } else f = i - b;
            b += f, c += f
        }
        while (eO(a.doc, c) != c) {
            if (e == (d < 0 ? 0 : g.length - 1)) return null;
            c += d * g[e - (d < 0 ? 1 : 0)].size, e += d
        }
        return {
            index: e,
            lineN: c
        }
    }

    function cJ(a, b, c) {
        var d = a.display,
            e = d.view;
        e.length == 0 || b >= d.viewTo || c <= d.viewFrom ? (d.view = cD(a, b, c), d.viewFrom = b) : (d.viewFrom > b ? d.view = cD(a, b, d.viewFrom).concat(d.view) : d.viewFrom < b && (d.view = d.view.slice(cH(a, b))), d.viewFrom = b, d.viewTo < c ? d.view = d.view.concat(cD(a, d.viewTo, c)) : d.viewTo > c && (d.view = d.view.slice(0, cH(a, c)))), d.viewTo = c
    }

    function cK(a) {
        var b = a.display.view,
            c = 0;
        for (var d = 0; d < b.length; d++) {
            var e = b[d];
            !e.hidden && (!e.node || e.changes) && ++c
        }
        return c
    }

    function cL(a) {
        if (a.display.pollingFast) return;
        a.display.poll.set(a.options.pollInterval, function() {
            cN(a), a.state.focused && cL(a)
        })
    }

    function cM(a) {
        function c() {
            var d = cN(a);
            !d && !b ? (b = !0, a.display.poll.set(60, c)) : (a.display.pollingFast = !1, cL(a))
        }
        var b = !1;
        a.display.pollingFast = !0, a.display.poll.set(20, c)
    }

    function cN(a) {
        var b = a.display.input,
            c = a.display.prevInput,
            e = a.doc;
        if (!a.state.focused || gQ(b) || cR(a) || a.options.disableInput) return !1;
        var f = b.value;
        if (f == c && !a.somethingSelected()) return !1;
        if (g && !d && a.display.inputHasSelection === f) return cO(a), !1;
        var h = !a.curOp;
        h && cw(a), a.display.shift = !1;
        var i = 0,
            j = Math.min(c.length, f.length);
        while (i < j && c.charCodeAt(i) == f.charCodeAt(i)) ++i;
        var k = f.slice(i),
            l = gP(k),
            m = a.state.pasteIncoming && l.length > 1 && e.sel.ranges.length == l.length;
        for (var n = e.sel.ranges.length - 1; n >= 0; n--) {
            var o = e.sel.ranges[n],
                p = o.from(),
                q = o.to();
            i < c.length ? p = bm(p.line, p.ch - (c.length - i)) : a.state.overwrite && o.empty() && !a.state.pasteIncoming && (q = bm(q.line, Math.min(fv(e, q.line).text.length, q.ch + gq(l).length)));
            var r = a.curOp.updateInput,
                s = {
                    from: p,
                    to: q,
                    text: m ? [l[n]] : l,
                    origin: a.state.pasteIncoming ? "paste" : a.state.cutIncoming ? "cut" : "+input"
                };
            dE(a.doc, s), gb(a, "inputRead", a, s);
            if (k && !a.state.pasteIncoming && a.options.electricChars && a.options.smartIndent && o.head.ch < 100 && (!n || e.sel.ranges[n - 1].head.line != o.head.line)) {
                var t = a.getModeAt(o.head).electricChars;
                if (t)
                    for (var u = 0; u < t.length; u++)
                        if (k.indexOf(t.charAt(u)) > -1) {
                            dS(a, o.head.line, "smart");
                            break
                        }
            }
        }
        return dQ(a), a.curOp.updateInput = r, a.curOp.typing = !0, f.length > 1e3 || f.indexOf("\n") > -1 ? b.value = a.display.prevInput = "" : a.display.prevInput = f, h && cx(a), a.state.pasteIncoming = a.state.cutIncoming = !1, !0
    }

    function cO(a, b) {
        var c, e, f = a.doc;
        if (a.somethingSelected()) {
            a.display.prevInput = "";
            var h = f.sel.primary();
            c = gR && (h.to().line - h.from().line > 100 || (e = a.getSelection()).length > 1e3);
            var i = c ? "-" : e || a.getSelection();
            a.display.input.value = i, a.state.focused && gr(a.display.input), g && !d && (a.display.inputHasSelection = i)
        } else b || (a.display.prevInput = a.display.input.value = "", g && !d && (a.display.inputHasSelection = null));
        a.display.inaccurateSelection = c
    }

    function cP(a) {
        a.options.readOnly != "nocursor" && (!r || gH() != a.display.input) && a.display.input.focus()
    }

    function cQ(a) {
        a.state.focused || (cP(a), dt(a))
    }

    function cR(a) {
        return a.options.readOnly || a.doc.cantEdit
    }

    function cS(a) {
        function e() {
            a.state.focused && setTimeout(gw(cP, a), 0)
        }

        function h() {
            f == null && (f = setTimeout(function() {
                f = null, c.cachedCharWidth = c.cachedTextHeight = c.cachedPaddingH = gJ = null, a.setSize()
            }, 100))
        }

        function i() {
            gG(document.body, c.wrapper) ? setTimeout(i, 5e3) : fZ(window, "resize", h)
        }

        function j(b) {
            gd(a, b) || fV(b)
        }

        function k(b) {
            c.inaccurateSelection && (c.prevInput = "", c.inaccurateSelection = !1, c.input.value = a.getSelection(), gr(c.input)), b.type == "cut" && (a.state.cutIncoming = !0)
        }
        var c = a.display;
        fY(c.scroller, "mousedown", cz(a, cV)), b ? fY(c.scroller, "dblclick", cz(a, function(b) {
            if (gd(a, b)) return;
            var c = cU(a, b);
            if (!c || da(a, b) || cT(a.display, b)) return;
            fS(b);
            var d = dX(a.doc, c);
            bB(a.doc, d.anchor, d.head)
        })) : fY(c.scroller, "dblclick", function(b) {
            gd(a, b) || fS(b)
        }), fY(c.lineSpace, "selectstart", function(a) {
            cT(c, a) || fS(a)
        }), w || fY(c.scroller, "contextmenu", function(b) {
            dw(a, b)
        }), fY(c.scroller, "scroll", function() {
            c.scroller.clientHeight && (de(a, c.scroller.scrollTop), df(a, c.scroller.scrollLeft, !0), f$(a, "scroll", a))
        }), fY(c.scrollbarV, "scroll", function() {
            c.scroller.clientHeight && de(a, c.scrollbarV.scrollTop)
        }), fY(c.scrollbarH, "scroll", function() {
            c.scroller.clientHeight && df(a, c.scrollbarH.scrollLeft)
        }), fY(c.scroller, "mousewheel", function(b) {
            di(a, b)
        }), fY(c.scroller, "DOMMouseScroll", function(b) {
            di(a, b)
        }), fY(c.scrollbarH, "mousedown", e), fY(c.scrollbarV, "mousedown", e), fY(c.wrapper, "scroll", function() {
            c.wrapper.scrollTop = c.wrapper.scrollLeft = 0
        });
        var f;
        fY(window, "resize", h), setTimeout(i, 5e3), fY(c.input, "keyup", cz(a, dr)), fY(c.input, "input", function() {
            g && !d && a.display.inputHasSelection && (a.display.inputHasSelection = null), cM(a)
        }), fY(c.input, "keydown", cz(a, dq)), fY(c.input, "keypress", cz(a, ds)), fY(c.input, "focus", gw(dt, a)), fY(c.input, "blur", gw(du, a)), a.options.dragDrop && (fY(c.scroller, "dragstart", function(b) {
            dd(a, b)
        }), fY(c.scroller, "dragenter", j), fY(c.scroller, "dragover", j), fY(c.scroller, "drop", cz(a, dc))), fY(c.scroller, "paste", function(b) {
            if (cT(c, b)) return;
            a.state.pasteIncoming = !0, cP(a), cM(a)
        }), fY(c.input, "paste", function() {
            a.state.pasteIncoming = !0, cM(a)
        }), fY(c.input, "cut", k), fY(c.input, "copy", k), m && fY(c.sizer, "mouseup", function() {
            gH() == c.input && c.input.blur(), cP(a)
        })
    }

    function cT(a, b) {
        for (var c = fW(b); c != a.wrapper; c = c.parentNode)
            if (!c || c.ignoreEvents || c.parentNode == a.sizer && c != a.mover) return !0
    }

    function cU(a, b, c, d) {
        var e = a.display;
        if (!c) {
            var f = fW(b);
            if (f == e.scrollbarH || f == e.scrollbarV || f == e.scrollbarFiller || f == e.gutterFiller) return null
        }
        var g, h, i = e.lineSpace.getBoundingClientRect();
        try {
            g = b.clientX - i.left, h = b.clientY - i.top
        } catch (b) {
            return null
        }
        var j = cq(a, g, h),
            k;
        if (d && j.xRel == 1 && (k = fv(a.doc, j.line).text).length == j.ch) {
            var l = gm(k, k.length, a.options.tabSize) - k.length;
            j = bm(j.line, Math.round((g - bX(a.display).left) / cu(a.display)) - l)
        }
        return j
    }

    function cV(a) {
        if (gd(this, a)) return;
        var b = this,
            c = b.display;
        c.shift = a.shiftKey;
        if (cT(c, a)) {
            h || (c.scroller.draggable = !1, setTimeout(function() {
                c.scroller.draggable = !0
            }, 100));
            return
        }
        if (da(b, a)) return;
        var d = cU(b, a);
        window.focus();
        switch (fX(a)) {
            case 1:
                d ? cY(b, a, d) : fW(a) == c.scroller && fS(a);
                break;
            case 2:
                h && (b.state.lastMiddleDown = +(new Date)), d && bB(b.doc, d), setTimeout(gw(cP, b), 20), fS(a);
                break;
            case 3:
                w && dw(b, a)
        }
    }

    function cY(a, b, c) {
        setTimeout(gw(cQ, a), 0);
        var d = +(new Date),
            e;
        cX && cX.time > d - 400 && bn(cX.pos, c) == 0 ? e = "triple" : cW && cW.time > d - 400 && bn(cW.pos, c) == 0 ? (e = "double", cX = {
            time: d,
            pos: c
        }) : (e = "single", cW = {
            time: d,
            pos: c
        });
        var f = a.doc.sel,
            g = !1;
        a.options.dragDrop && gI && !g && !cR(a) && e == "single" && f.contains(c) > -1 && f.somethingSelected() ? cZ(a, b, c) : c$(a, b, c, e, g)
    }

    function cZ(a, c, e) {
        var f = a.display,
            g = cz(a, function(i) {
                h && (f.scroller.draggable = !1), a.state.draggingText = !1, fZ(document, "mouseup", g), fZ(f.scroller, "drop", g), Math.abs(c.clientX - i.clientX) + Math.abs(c.clientY - i.clientY) < 10 && (fS(i), bB(a.doc, e), cP(a), b && !d && setTimeout(function() {
                    document.body.focus(), cP(a)
                }, 20))
            });
        h && (f.scroller.draggable = !0), a.state.draggingText = g, f.scroller.dragDrop && f.scroller.dragDrop(), fY(document, "mouseup", g), fY(f.scroller, "drop", g)
    }

    function c$(a, b, c, d, f) {
        function p(b) {
            if (bn(o, b) == 0) return;
            o = b;
            if (d == "rect") {
                var e = [],
                    f = a.options.tabSize,
                    g = gm(fv(i, c.line).text, c.ch, f),
                    h = gm(fv(i, b.line).text, b.ch, f),
                    m = Math.min(g, h),
                    n = Math.max(g, h);
                for (var p = Math.min(c.line, b.line), q = Math.min(a.lastLine(), Math.max(c.line, b.line)); p <= q; p++) {
                    var r = fv(i, p).text,
                        s = gn(r, m, f);
                    m == n ? e.push(new bs(bm(p, s), bm(p, s))) : r.length > s && e.push(new bs(bm(p, s), bm(p, gn(r, n, f))))
                }
                e.length || e.push(new bs(c, c)), bH(i, bt(l.ranges.slice(0, k).concat(e), k), gj)
            } else {
                var t = j,
                    u = t.anchor,
                    v = b;
                if (d != "single") {
                    if (d == "double") var w = dX(i, b);
                    else var w = new bs(bm(b.line, 0), bw(i, bm(b.line + 1, 0)));
                    bn(w.anchor, u) > 0 ? (v = w.head, u = bq(t.from(), w.anchor)) : (v = w.anchor, u = bp(t.to(), w.head))
                }
                var e = l.ranges.slice(0);
                e[k] = new bs(bw(i, u), v), bH(i, bt(e, k), gj)
            }
        }

        function s(b) {
            var c = ++r,
                e = cU(a, b, !0, d == "rect");
            if (!e) return;
            if (bn(e, o) != 0) {
                cQ(a), p(e);
                var f = P(h, i);
                (e.line >= f.to || e.line < f.from) && setTimeout(cz(a, function() {
                    r == c && s(b)
                }), 150)
            } else {
                var g = b.clientY < q.top ? -20 : b.clientY > q.bottom ? 20 : 0;
                g && setTimeout(cz(a, function() {
                    if (r != c) return;
                    h.scroller.scrollTop += g, s(b)
                }), 50)
            }
        }

        function t(b) {
            r = Infinity, fS(b), cP(a), fZ(document, "mousemove", u), fZ(document, "mouseup", v), i.history.lastSelOrigin = null
        }
        var h = a.display,
            i = a.doc;
        fS(b);
        var j, k, l = i.sel;
        f ? (k = i.sel.contains(c), k > -1 ? j = i.sel.ranges[k] : j = new bs(c, c)) : j = i.sel.primary();
        if (b.altKey) d = "rect", f || (j = new bs(c, c)), c = cU(a, b, !0, !0), k = -1;
        else if (d == "double") {
            var m = dX(i, c);
            a.display.shift || i.extend ? j = bA(i, j, m.anchor, m.head) : j = m
        } else if (d == "triple") {
            var n = new bs(bm(c.line, 0), bw(i, bm(c.line + 1, 0)));
            a.display.shift || i.extend ? j = bA(i, j, n.anchor, n.head) : j = n
        } else j = bA(i, j, c);
        f ? k > -1 ? bD(i, k, j, gj) : (k = i.sel.ranges.length, bH(i, bt(i.sel.ranges.concat([j]), k), {
            scroll: !1,
            origin: "*mouse"
        })) : (k = 0, bH(i, new br([j], 0), gj));
        var o = c,
            q = h.wrapper.getBoundingClientRect(),
            r = 0,
            u = cz(a, function(a) {
                (g && !e ? !a.buttons : !fX(a)) ? t(a): s(a)
            }),
            v = cz(a, t);
        fY(document, "mousemove", u), fY(document, "mouseup", v)
    }

    function c_(a, b, c, d, e) {
        try {
            var f = b.clientX,
                g = b.clientY
        } catch (b) {
            return !1
        }
        if (f >= Math.floor(a.display.gutters.getBoundingClientRect().right)) return !1;
        d && fS(b);
        var h = a.display,
            i = h.lineDiv.getBoundingClientRect();
        if (g > i.bottom || !ge(a, c)) return fU(b);
        g -= i.top - h.viewOffset;
        for (var j = 0; j < a.options.gutters.length; ++j) {
            var k = h.gutters.childNodes[j];
            if (k && k.getBoundingClientRect().right >= f) {
                var l = fA(a.doc, g),
                    m = a.options.gutters[j];
                return e(a, c, a, l, m, b), fU(b)
            }
        }
    }

    function da(a, b) {
        return c_(a, b, "gutterClick", !0, gb)
    }

    function dc(a) {
        var c = this;
        if (gd(c, a) || cT(c.display, a)) return;
        fS(a), b && (db = +(new Date));
        var d = cU(c, a, !0),
            e = a.dataTransfer.files;
        if (!d || cR(c)) return;
        if (e && e.length && window.FileReader && window.File) {
            var f = e.length,
                g = Array(f),
                h = 0,
                i = function(a, b) {
                    var e = new FileReader;
                    e.onload = function() {
                        g[b] = e.result;
                        if (++h == f) {
                            d = bw(c.doc, d);
                            var a = {
                                from: d,
                                to: d,
                                text: gP(g.join("\n")),
                                origin: "paste"
                            };
                            dE(c.doc, a), bG(c.doc, bu(d, dy(a)))
                        }
                    }, e.readAsText(a)
                };
            for (var j = 0; j < f; ++j) i(e[j], j)
        } else {
            if (c.state.draggingText && c.doc.sel.contains(d) > -1) {
                c.state.draggingText(a), setTimeout(gw(cP, c), 20);
                return
            }
            try {
                var g = a.dataTransfer.getData("Text");
                if (g) {
                    var k = c.state.draggingText && c.listSelections();
                    bI(c.doc, bu(d, d));
                    if (k)
                        for (var j = 0; j < k.length; ++j) dK(c.doc, "", k[j].anchor, k[j].head, "drag");
                    c.replaceSelection(g, "around", "paste"), cP(c)
                }
            } catch (a) {}
        }
    }

    function dd(a, c) {
        if (b && (!a.state.draggingText || +(new Date) - db < 100)) {
            fV(c);
            return
        }
        if (gd(a, c) || cT(a.display, c)) return;
        c.dataTransfer.setData("Text", a.getSelection());
        if (c.dataTransfer.setDragImage && !l) {
            var d = gC("img", null, null, "position: fixed; left: 0; top: 0;");
            d.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", k && (d.width = d.height = 1, a.display.wrapper.appendChild(d), d._top = d.offsetTop), c.dataTransfer.setDragImage(d, 0, 0), k && d.parentNode.removeChild(d)
        }
    }

    function de(b, c) {
        if (Math.abs(b.doc.scrollTop - c) < 2) return;
        b.doc.scrollTop = c, a || U(b, {
            top: c
        }), b.display.scroller.scrollTop != c && (b.display.scroller.scrollTop = c), b.display.scrollbarV.scrollTop != c && (b.display.scrollbarV.scrollTop = c), a && U(b), bR(b, 100)
    }

    function df(a, b, c) {
        if (c ? b == a.doc.scrollLeft : Math.abs(a.doc.scrollLeft - b) < 2) return;
        b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth), a.doc.scrollLeft = b, Q(a), a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b), a.display.scrollbarH.scrollLeft != b && (a.display.scrollbarH.scrollLeft = b)
    }

    function di(b, c) {
        var d = c.wheelDeltaX,
            e = c.wheelDeltaY;
        d == null && c.detail && c.axis == c.HORIZONTAL_AXIS && (d = c.detail), e == null && c.detail && c.axis == c.VERTICAL_AXIS ? e = c.detail : e == null && (e = c.wheelDelta);
        var f = b.display,
            g = f.scroller;
        if (!(d && g.scrollWidth > g.clientWidth || e && g.scrollHeight > g.clientHeight)) return;
        if (e && s && h) a: for (var i = c.target, j = f.view; i != g; i = i.parentNode)
            for (var l = 0; l < j.length; l++)
                if (j[l].node == i) {
                    b.display.currentWheelTarget = i;
                    break a
                }
        if (d && !a && !k && dh != null) {
            e && de(b, Math.max(0, Math.min(g.scrollTop + e * dh, g.scrollHeight - g.clientHeight))), df(b, Math.max(0, Math.min(g.scrollLeft + d * dh, g.scrollWidth - g.clientWidth))), fS(c), f.wheelStartX = null;
            return
        }
        if (e && dh != null) {
            var m = e * dh,
                n = b.doc.scrollTop,
                o = n + f.wrapper.clientHeight;
            m < 0 ? n = Math.max(0, n + m - 50) : o = Math.min(b.doc.height, o + m + 50), U(b, {
                top: n,
                bottom: o
            })
        }
        dg < 20 && (f.wheelStartX == null ? (f.wheelStartX = g.scrollLeft, f.wheelStartY = g.scrollTop, f.wheelDX = d, f.wheelDY = e, setTimeout(function() {
            if (f.wheelStartX == null) return;
            var a = g.scrollLeft - f.wheelStartX,
                b = g.scrollTop - f.wheelStartY,
                c = b && f.wheelDY && b / f.wheelDY || a && f.wheelDX && a / f.wheelDX;
            f.wheelStartX = f.wheelStartY = null;
            if (!c) return;
            dh = (dh * dg + c) / (dg + 1), ++dg
        }, 200)) : (f.wheelDX += d, f.wheelDY += e))
    }

    function dj(a, b, c) {
        if (typeof b == "string") {
            b = eh[b];
            if (!b) return !1
        }
        a.display.pollingFast && cN(a) && (a.display.pollingFast = !1);
        var d = a.display.shift,
            e = !1;
        try {
            cR(a) && (a.state.suppressEdits = !0), c && (a.display.shift = !1), e = b(a) != gh
        } finally {
            a.display.shift = d, a.state.suppressEdits = !1
        }
        return e
    }

    function dk(a) {
        var b = a.state.keyMaps.slice(0);
        return a.options.extraKeys && b.push(a.options.extraKeys), b.push(a.options.keyMap), b
    }

    function dm(a, b) {
        var c = ej(a.options.keyMap),
            d = c.auto;
        clearTimeout(dl), d && !el(b) && (dl = setTimeout(function() {
            ej(a.options.keyMap) == c && (a.options.keyMap = d.call ? d.call(null, a) : d, G(a))
        }, 50));
        var e = em(b, !0),
            f = !1;
        if (!e) return !1;
        var g = dk(a);
        return b.shiftKey ? f = ek("Shift-" + e, g, function(b) {
            return dj(a, b, !0)
        }) || ek(e, g, function(b) {
            if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) return dj(a, b)
        }) : f = ek(e, g, function(b) {
            return dj(a, b)
        }), f && (fS(b), bQ(a), gb(a, "keyHandled", a, e, b)), f
    }

    function dn(a, b, c) {
        var d = ek("'" + c + "'", dk(a), function(b) {
            return dj(a, b, !0)
        });
        return d && (fS(b), bQ(a), gb(a, "keyHandled", a, "'" + c + "'", b)), d
    }

    function dq(a) {
        var c = this;
        cQ(c);
        if (gd(c, a)) return;
        b && a.keyCode == 27 && (a.returnValue = !1);
        var d = a.keyCode;
        c.display.shift = d == 16 || a.shiftKey;
        var e = dm(c, a);
        k && (dp = e ? d : null, !e && d == 88 && !gR && (s ? a.metaKey : a.ctrlKey) && c.replaceSelection("", null, "cut"))
    }

    function dr(a) {
        if (gd(this, a)) return;
        a.keyCode == 16 && (this.doc.sel.shift = !1)
    }

    function ds(a) {
        var b = this;
        if (gd(b, a)) return;
        var c = a.keyCode,
            e = a.charCode;
        if (k && c == dp) {
            dp = null, fS(a);
            return
        }
        if ((k && (!a.which || a.which < 10) || m) && dm(b, a)) return;
        var f = String.fromCharCode(e == null ? c : e);
        if (dn(b, a, f)) return;
        g && !d && (b.display.inputHasSelection = null), cM(b)
    }

    function dt(a) {
        if (a.options.readOnly == "nocursor") return;
        a.state.focused || (f$(a, "focus", a), a.state.focused = !0, a.display.wrapper.className.search(/\bCodeMirror-focused\b/) == -1 && (a.display.wrapper.className += " CodeMirror-focused"), a.curOp || (cO(a), h && setTimeout(gw(cO, a, !0), 0))), cL(a), bQ(a)
    }

    function du(a) {
        a.state.focused && (f$(a, "blur", a), a.state.focused = !1, a.display.wrapper.className = a.display.wrapper.className.replace(" CodeMirror-focused", "")), clearInterval(a.display.blinker), setTimeout(function() {
            a.state.focused || (a.display.shift = !1)
        }, 150)
    }

    function dw(a, b) {
        function j() {
            if (c.input.selectionStart != null) {
                var b = c.input.value = "â€‹" + (a.somethingSelected() ? c.input.value : "");
                c.prevInput = "â€‹", c.input.selectionStart = 1, c.input.selectionEnd = b.length
            }
        }

        function l() {
            c.inputDiv.style.position = "relative", c.input.style.cssText = i, d && (c.scrollbarV.scrollTop = c.scroller.scrollTop = f), cL(a);
            if (c.input.selectionStart != null) {
                (!g || d) && j(), clearTimeout(dv);
                var b = 0,
                    e = function() {
                        c.prevInput == "â€‹" && c.input.selectionStart == 0 ? cz(a, eh.selectAll)(a) : b++ < 10 ? dv = setTimeout(e, 500) : cO(a)
                    };
                dv = setTimeout(e, 200)
            }
        }
        if (gd(a, b, "contextmenu")) return;
        var c = a.display;
        if (cT(c, b) || dx(a, b)) return;
        var e = cU(a, b),
            f = c.scroller.scrollTop;
        if (!e || k) return;
        var h = a.options.resetSelectionOnContextMenu;
        h && a.doc.sel.contains(e) == -1 && cz(a, bH)(a.doc, bu(e), gi);
        var i = c.input.style.cssText;
        c.inputDiv.style.position = "absolute", c.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (b.clientY - 5) + "px; left: " + (b.clientX - 5) + "px; z-index: 1000; background: " + (g ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", cP(a), cO(a), a.somethingSelected() || (c.input.value = c.prevInput = " "), g && !d && j();
        if (w) {
            fV(b);
            var m = function() {
                fZ(window, "mouseup", m), setTimeout(l, 20)
            };
            fY(window, "mouseup", m)
        } else setTimeout(l, 50)
    }

    function dx(a, b) {
        return ge(a, "gutterContextMenu") ? c_(a, b, "gutterContextMenu", !1, f$) : !1
    }

    function dz(a, b) {
        if (bn(a, b.from) < 0) return a;
        if (bn(a, b.to) <= 0) return dy(b);
        var c = a.line + b.text.length - (b.to.line - b.from.line) - 1,
            d = a.ch;
        return a.line == b.to.line && (d += dy(b).ch - b.to.ch), bm(c, d)
    }

    function dA(a, b) {
        var c = [];
        for (var d = 0; d < a.sel.ranges.length; d++) {
            var e = a.sel.ranges[d];
            c.push(new bs(dz(e.anchor, b), dz(e.head, b)))
        }
        return bt(c, a.sel.primIndex)
    }

    function dB(a, b, c) {
        return a.line == b.line ? bm(c.line, a.ch - b.ch + c.ch) : bm(c.line + (a.line - b.line), a.ch)
    }

    function dC(a, b, c) {
        var d = [],
            e = bm(a.first, 0),
            f = e;
        for (var g = 0; g < b.length; g++) {
            var h = b[g],
                i = dB(h.from, e, f),
                j = dB(dy(h), e, f);
            e = h.to, f = j;
            if (c == "around") {
                var k = a.sel.ranges[g],
                    l = bn(k.head, k.anchor) < 0;
                d[g] = new bs(l ? j : i, l ? i : j)
            } else d[g] = new bs(i, i)
        }
        return new br(d, a.sel.primIndex)
    }

    function dD(a, b, c) {
        var d = {
            canceled: !1,
            from: b.from,
            to: b.to,
            text: b.text,
            origin: b.origin,
            cancel: function() {
                this.canceled = !0
            }
        };
        return c && (d.update = function(b, c, d, e) {
            b && (this.from = bw(a, b)), c && (this.to = bw(a, c)), d && (this.text = d), e !== undefined && (this.origin = e)
        }), f$(a, "beforeChange", a, d), a.cm && f$(a.cm, "beforeChange", a.cm, d), d.canceled ? null : {
            from: d.from,
            to: d.to,
            text: d.text,
            origin: d.origin
        }
    }

    function dE(a, b, c) {
        if (a.cm) {
            if (!a.cm.curOp) return cz(a.cm, dE)(a, b, c);
            if (a.cm.state.suppressEdits) return
        }
        if (ge(a, "beforeChange") || a.cm && ge(a.cm, "beforeChange")) {
            b = dD(a, b, !0);
            if (!b) return
        }
        var d = x && !c && eC(a, b.from, b.to);
        if (d)
            for (var e = d.length - 1; e >= 0; --e) dF(a, {
                from: d[e].from,
                to: d[e].to,
                text: e ? [""] : b.text
            });
        else dF(a, b)
    }

    function dF(a, b) {
        if (b.text.length == 1 && b.text[0] == "" && bn(b.from, b.to) == 0) return;
        var c = dA(a, b);
        fH(a, b, c, a.cm ? a.cm.curOp.id : NaN), dI(a, b, c, ez(a, b));
        var d = [];
        ft(a, function(a, c) {
            !c && gs(d, a.history) == -1 && (fR(a.history, b), d.push(a.history)), dI(a, b, null, ez(a, b))
        })
    }

    function dG(a, b, c) {
        if (a.cm && a.cm.state.suppressEdits) return;
        var d = a.history,
            e, f = a.sel,
            g = b == "undo" ? d.done : d.undone,
            h = b == "undo" ? d.undone : d.done;
        for (var i = 0; i < g.length; i++) {
            e = g[i];
            if (c ? e.ranges && !e.equals(a.sel) : !e.ranges) break
        }
        if (i == g.length) return;
        d.lastOrigin = d.lastSelOrigin = null;
        for (;;) {
            e = g.pop();
            if (!e.ranges) break;
            fK(e, h);
            if (c && !e.equals(a.sel)) {
                bH(a, e, {
                    clearRedo: !1
                });
                return
            }
            f = e
        }
        var j = [];
        fK(f, h), h.push({
            changes: j,
            generation: d.generation
        }), d.generation = e.generation || ++d.maxGeneration;
        var k = ge(a, "beforeChange") || a.cm && ge(a.cm, "beforeChange");
        for (var i = e.changes.length - 1; i >= 0; --i) {
            var l = e.changes[i];
            l.origin = b;
            if (k && !dD(a, l, !1)) {
                g.length = 0;
                return
            }
            j.push(fE(a, l));
            var m = i ? dA(a, l, null) : gq(g);
            dI(a, l, m, eB(a, l)), a.cm && dQ(a.cm);
            var n = [];
            ft(a, function(a, b) {
                !b && gs(n, a.history) == -1 && (fR(a.history, l), n.push(a.history)), dI(a, l, null, eB(a, l))
            })
        }
    }

    function dH(a, b) {
        a.first += b, a.sel = new br(gt(a.sel.ranges, function(a) {
            return new bs(bm(a.anchor.line + b, a.anchor.ch), bm(a.head.line + b, a.head.ch))
        }), a.sel.primIndex), a.cm && cE(a.cm, a.first, a.first - b, b)
    }

    function dI(a, b, c, d) {
        if (a.cm && !a.cm.curOp) return cz(a.cm, dI)(a, b, c, d);
        if (b.to.line < a.first) {
            dH(a, b.text.length - 1 - (b.to.line - b.from.line));
            return
        }
        if (b.from.line > a.lastLine()) return;
        if (b.from.line < a.first) {
            var e = b.text.length - 1 - (a.first - b.from.line);
            dH(a, e), b = {
                from: bm(a.first, 0),
                to: bm(b.to.line + e, b.to.ch),
                text: [gq(b.text)],
                origin: b.origin
            }
        }
        var f = a.lastLine();
        b.to.line > f && (b = {
            from: b.from,
            to: bm(f, fv(a, f).text.length),
            text: [b.text[0]],
            origin: b.origin
        }), b.removed = fw(a, b.from, b.to), c || (c = dA(a, b, null)), a.cm ? dJ(a.cm, b, d) : fm(a, b, d), bI(a, c, gi)
    }

    function dJ(a, b, c) {
        var d = a.doc,
            e = a.display,
            f = b.from,
            g = b.to,
            h = !1,
            i = f.line;
        a.options.lineWrapping || (i = fz(eM(fv(d, f.line))), d.iter(i, g.line + 1, function(a) {
            if (a == e.maxLine) return h = !0, !0
        })), d.sel.contains(b.from, b.to) > -1 && (a.curOp.cursorActivity = !0), fm(d, b, c, E(a)), a.options.lineWrapping || (d.iter(i, f.line + b.text.length, function(a) {
            var b = K(a);
            b > e.maxLineLength && (e.maxLine = a, e.maxLineLength = b, e.maxLineChanged = !0, h = !1)
        }), h && (a.curOp.updateMaxLine = !0)), d.frontier = Math.min(d.frontier, f.line), bR(a, 400);
        var j = b.text.length - (g.line - f.line) - 1;
        f.line == g.line && b.text.length == 1 && !fl(a.doc, b) ? cF(a, f.line, "text") : cE(a, f.line, g.line + 1, j), (ge(a, "change") || ge(a, "changes")) && (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push({
            from: f,
            to: g,
            text: b.text,
            removed: b.removed,
            origin: b.origin
        })
    }

    function dK(a, b, c, d, e) {
        d || (d = c);
        if (bn(d, c) < 0) {
            var f = d;
            d = c, c = f
        }
        typeof b == "string" && (b = gP(b)), dE(a, {
            from: c,
            to: d,
            text: b,
            origin: e
        })
    }

    function dL(a, b) {
        var c = a.display,
            d = c.sizer.getBoundingClientRect(),
            e = null;
        b.top + d.top < 0 ? e = !0 : b.bottom + d.top > (window.innerHeight || document.documentElement.clientHeight) && (e = !1);
        if (e != null && !p) {
            var f = gC("div", "â€‹", null, "position: absolute; top: " + (b.top - c.viewOffset - bV(a.display)) + "px; height: " + (b.bottom - b.top + gg) + "px; left: " + b.left + "px; width: 2px;");
            a.display.lineSpace.appendChild(f), f.scrollIntoView(e), a.display.lineSpace.removeChild(f)
        }
    }

    function dM(a, b, c, d) {
        d == null && (d = 0);
        for (;;) {
            var e = !1,
                f = cn(a, b),
                g = !c || c == b ? f : cn(a, c),
                h = dO(a, Math.min(f.left, g.left), Math.min(f.top, g.top) - d, Math.max(f.left, g.left), Math.max(f.bottom, g.bottom) + d),
                i = a.doc.scrollTop,
                j = a.doc.scrollLeft;
            h.scrollTop != null && (de(a, h.scrollTop), Math.abs(a.doc.scrollTop - i) > 1 && (e = !0)), h.scrollLeft != null && (df(a, h.scrollLeft), Math.abs(a.doc.scrollLeft - j) > 1 && (e = !0));
            if (!e) return f
        }
    }

    function dN(a, b, c, d, e) {
        var f = dO(a, b, c, d, e);
        f.scrollTop != null && de(a, f.scrollTop), f.scrollLeft != null && df(a, f.scrollLeft)
    }

    function dO(a, b, c, d, e) {
        var f = a.display,
            g = ct(a.display);
        c < 0 && (c = 0);
        var h = a.curOp && a.curOp.scrollTop != null ? a.curOp.scrollTop : f.scroller.scrollTop,
            i = f.scroller.clientHeight - gg,
            j = {},
            k = a.doc.height + bW(f),
            l = c < g,
            m = e > k - g;
        if (c < h) j.scrollTop = l ? 0 : c;
        else if (e > h + i) {
            var n = Math.min(c, (m ? k : e) - i);
            n != h && (j.scrollTop = n)
        }
        var o = a.curOp && a.curOp.scrollLeft != null ? a.curOp.scrollLeft : f.scroller.scrollLeft,
            p = f.scroller.clientWidth - gg;
        b += f.gutters.offsetWidth, d += f.gutters.offsetWidth;
        var q = f.gutters.offsetWidth,
            r = b < q + 10;
        return b < o + q || r ? (r && (b = 0), j.scrollLeft = Math.max(0, b - 10 - q)) : d > p + o - 3 && (j.scrollLeft = d + 10 - p), j
    }

    function dP(a, b, c) {
        (b != null || c != null) && dR(a), b != null && (a.curOp.scrollLeft = (a.curOp.scrollLeft == null ? a.doc.scrollLeft : a.curOp.scrollLeft) + b), c != null && (a.curOp.scrollTop = (a.curOp.scrollTop == null ? a.doc.scrollTop : a.curOp.scrollTop) + c)
    }

    function dQ(a) {
        dR(a);
        var b = a.getCursor(),
            c = b,
            d = b;
        a.options.lineWrapping || (c = b.ch ? bm(b.line, b.ch - 1) : b, d = bm(b.line, b.ch + 1)), a.curOp.scrollToPos = {
            from: c,
            to: d,
            margin: a.options.cursorScrollMargin,
            isCursor: !0
        }
    }

    function dR(a) {
        var b = a.curOp.scrollToPos;
        if (b) {
            a.curOp.scrollToPos = null;
            var c = co(a, b.from),
                d = co(a, b.to),
                e = dO(a, Math.min(c.left, d.left), Math.min(c.top, d.top) - b.margin, Math.max(c.right, d.right), Math.max(c.bottom, d.bottom) + b.margin);
            a.scrollTo(e.scrollLeft, e.scrollTop)
        }
    }

    function dS(a, b, c, d) {
        var e = a.doc,
            f;
        c == null && (c = "add"), c == "smart" && (a.doc.mode.indent ? f = bU(a, b) : c = "prev");
        var g = a.options.tabSize,
            h = fv(e, b),
            i = gm(h.text, null, g);
        h.stateAfter && (h.stateAfter = null);
        var j = h.text.match(/^\s*/)[0],
            k;
        if (!d && !/\S/.test(h.text)) k = 0, c = "not";
        else if (c == "smart") {
            k = a.doc.mode.indent(f, h.text.slice(j.length), h.text);
            if (k == gh) {
                if (!d) return;
                c = "prev"
            }
        }
        c == "prev" ? b > e.first ? k = gm(fv(e, b - 1).text, null, g) : k = 0 : c == "add" ? k = i + a.options.indentUnit : c == "subtract" ? k = i - a.options.indentUnit : typeof c == "number" && (k = i + c), k = Math.max(0, k);
        var l = "",
            m = 0;
        if (a.options.indentWithTabs)
            for (var n = Math.floor(k / g); n; --n) m += g, l += "\t";
        m < k && (l += gp(k - m));
        if (l != j) dK(a.doc, l, bm(b, 0), bm(b, j.length), "+input");
        else
            for (var n = 0; n < e.sel.ranges.length; n++) {
                var o = e.sel.ranges[n];
                if (o.head.line == b && o.head.ch < j.length) {
                    var m = bm(b, j.length);
                    bD(e, n, new bs(m, m));
                    break
                }
            }
        h.stateAfter = null
    }

    function dT(a, b, c, d) {
        var e = b,
            f = b,
            g = a.doc;
        typeof b == "number" ? f = fv(g, bv(g, b)) : e = fz(b);
        if (e == null) return null;
        if (d(f, e)) cF(a, e, c);
        else return null;
        return f
    }

    function dU(a, b) {
        var c = a.doc.sel.ranges,
            d = [];
        for (var e = 0; e < c.length; e++) {
            var f = b(c[e]);
            while (d.length && bn(f.from, gq(d).to) <= 0) {
                var g = d.pop();
                if (bn(g.from, f.from) < 0) {
                    f.from = g.from;
                    break
                }
            }
            d.push(f)
        }
        cy(a, function() {
            for (var b = d.length - 1; b >= 0; b--) dK(a.doc, "", d[b].from, d[b].to, "+delete");
            dQ(a)
        })
    }

    function dV(a, b, c, d, e) {
        function k() {
            var b = f + c;
            return b < a.first || b >= a.first + a.size ? j = !1 : (f = b, i = fv(a, b))
        }

        function l(a) {
            var b = (e ? hc : hd)(i, g, c, !0);
            if (b == null)
                if (!a && k()) e ? g = (c < 0 ? gX : gW)(i) : g = c < 0 ? i.text.length : 0;
                else return j = !1;
            else g = b;
            return !0
        }
        var f = b.line,
            g = b.ch,
            h = c,
            i = fv(a, f),
            j = !0;
        if (d == "char") l();
        else if (d == "column") l(!0);
        else if (d == "word" || d == "group") {
            var m = null,
                n = d == "group";
            for (var o = !0;; o = !1) {
                if (c < 0 && !l(!o)) break;
                var p = i.text.charAt(g) || "\n",
                    q = gy(p) ? "w" : n && p == "\n" ? "n" : !n || /\s/.test(p) ? null : "p";
                n && !o && !q && (q = "s");
                if (m && m != q) {
                    c < 0 && (c = 1, l());
                    break
                }
                q && (m = q);
                if (c > 0 && !l(!o)) break
            }
        }
        var r = bM(a, bm(f, g), h, !0);
        return j || (r.hitSide = !0), r
    }

    function dW(a, b, c, d) {
        var e = a.doc,
            f = b.left,
            g;
        if (d == "page") {
            var h = Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            g = b.top + c * (h - (c < 0 ? 1.5 : .5) * ct(a.display))
        } else d == "line" && (g = c > 0 ? b.bottom + 3 : b.top - 3);
        for (;;) {
            var i = cq(a, f, g);
            if (!i.outside) break;
            if (c < 0 ? g <= 0 : g >= e.height) {
                i.hitSide = !0;
                break
            }
            g += c * 5
        }
        return i
    }

    function dX(a, b) {
        var c = fv(a, b.line).text,
            d = b.ch,
            e = b.ch;
        if (c) {
            (b.xRel < 0 || e == c.length) && d ? --d : ++e;
            var f = c.charAt(d),
                g = gy(f) ? gy : /\s/.test(f) ? function(a) {
                    return /\s/.test(a)
                } : function(a) {
                    return !/\s/.test(a) && !gy(a)
                };
            while (d > 0 && g(c.charAt(d - 1))) --d;
            while (e < c.length && g(c.charAt(e))) ++e
        }
        return new bs(bm(b.line, d), bm(b.line, e))
    }

    function d$(a, b, c, d) {
        z.defaults[a] = b, c && (dZ[a] = d ? function(a, b, d) {
            d != d_ && c(a, b, d)
        } : c)
    }

    function ej(a) {
        return typeof a == "string" ? ei[a] : a
    }

    function eq(a, b, c, d, e) {
        if (d && d.shared) return es(a, b, c, d, e);
        if (a.cm && !a.cm.curOp) return cz(a.cm, eq)(a, b, c, d, e);
        var f = new eo(a, e),
            g = bn(b, c);
        d && gv(d, f);
        if (g > 0 || g == 0 && f.clearWhenEmpty !== !1) return f;
        f.replacedWith && (f.collapsed = !0, f.widgetNode = gC("span", [f.replacedWith], "CodeMirror-widget"), d.handleMouseEvents || (f.widgetNode.ignoreEvents = !0), d.insertLeft && (f.widgetNode.insertLeft = !0));
        if (f.collapsed) {
            if (eL(a, b.line, b, c, f) || b.line != c.line && eL(a, c.line, b, c, f)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            y = !0
        }
        f.addToHistory && fH(a, {
            from: b,
            to: c,
            origin: "markText"
        }, a.sel, NaN);
        var h = b.line,
            i = a.cm,
            j;
        a.iter(h, c.line + 1, function(a) {
            i && f.collapsed && !i.options.lineWrapping && eM(a) == i.display.maxLine && (j = !0), f.collapsed && h != b.line && fy(a, 0), ew(a, new et(f, h == b.line ? b.ch : null, h == c.line ? c.ch : null)), ++h
        }), f.collapsed && a.iter(b.line, c.line + 1, function(b) {
            eQ(a, b) && fy(b, 0)
        }), f.clearOnEnter && fY(f, "beforeCursorEnter", function() {
            f.clear()
        }), f.readOnly && (x = !0, (a.history.done.length || a.history.undone.length) && a.clearHistory()), f.collapsed && (f.id = ++ep, f.atomic = !0);
        if (i) {
            j && (i.curOp.updateMaxLine = !0);
            if (f.collapsed) cE(i, b.line, c.line + 1);
            else if (f.className || f.title || f.startStyle || f.endStyle)
                for (var k = b.line; k <= c.line; k++) cF(i, k, "text");
            f.atomic && bK(i.doc), gb(i, "markerAdded", i, f)
        }
        return f
    }

    function es(a, b, c, d, e) {
        d = gv(d), d.shared = !1;
        var f = [eq(a, b, c, d, e)],
            g = f[0],
            h = d.widgetNode;
        return ft(a, function(a) {
            h && (d.widgetNode = h.cloneNode(!0)), f.push(eq(a, bw(a, b), bw(a, c), d, e));
            for (var i = 0; i < a.linked.length; ++i)
                if (a.linked[i].isParent) return;
            g = gq(f)
        }), new er(f, g)
    }

    function et(a, b, c) {
        this.marker = a, this.from = b, this.to = c
    }

    function eu(a, b) {
        if (a)
            for (var c = 0; c < a.length; ++c) {
                var d = a[c];
                if (d.marker == b) return d
            }
    }

    function ev(a, b) {
        for (var c, d = 0; d < a.length; ++d) a[d] != b && (c || (c = [])).push(a[d]);
        return c
    }

    function ew(a, b) {
        a.markedSpans = a.markedSpans ? a.markedSpans.concat([b]) : [b], b.marker.attachLine(a)
    }

    function ex(a, b, c) {
        if (a)
            for (var d = 0, e; d < a.length; ++d) {
                var f = a[d],
                    g = f.marker,
                    h = f.from == null || (g.inclusiveLeft ? f.from <= b : f.from < b);
                if (h || f.from == b && g.type == "bookmark" && (!c || !f.marker.insertLeft)) {
                    var i = f.to == null || (g.inclusiveRight ? f.to >= b : f.to > b);
                    (e || (e = [])).push(new et(g, f.from, i ? null : f.to))
                }
            }
        return e
    }

    function ey(a, b, c) {
        if (a)
            for (var d = 0, e; d < a.length; ++d) {
                var f = a[d],
                    g = f.marker,
                    h = f.to == null || (g.inclusiveRight ? f.to >= b : f.to > b);
                if (h || f.from == b && g.type == "bookmark" && (!c || f.marker.insertLeft)) {
                    var i = f.from == null || (g.inclusiveLeft ? f.from <= b : f.from < b);
                    (e || (e = [])).push(new et(g, i ? null : f.from - b, f.to == null ? null : f.to - b))
                }
            }
        return e
    }

    function ez(a, b) {
        var c = by(a, b.from.line) && fv(a, b.from.line).markedSpans,
            d = by(a, b.to.line) && fv(a, b.to.line).markedSpans;
        if (!c && !d) return null;
        var e = b.from.ch,
            f = b.to.ch,
            g = bn(b.from, b.to) == 0,
            h = ex(c, e, g),
            i = ey(d, f, g),
            j = b.text.length == 1,
            k = gq(b.text).length + (j ? e : 0);
        if (h)
            for (var l = 0; l < h.length; ++l) {
                var m = h[l];
                if (m.to == null) {
                    var n = eu(i, m.marker);
                    n ? j && (m.to = n.to == null ? null : n.to + k) : m.to = e
                }
            }
        if (i)
            for (var l = 0; l < i.length; ++l) {
                var m = i[l];
                m.to != null && (m.to += k);
                if (m.from == null) {
                    var n = eu(h, m.marker);
                    n || (m.from = k, j && (h || (h = [])).push(m))
                } else m.from += k, j && (h || (h = [])).push(m)
            }
        h && (h = eA(h)), i && i != h && (i = eA(i));
        var o = [h];
        if (!j) {
            var p = b.text.length - 2,
                q;
            if (p > 0 && h)
                for (var l = 0; l < h.length; ++l) h[l].to == null && (q || (q = [])).push(new et(h[l].marker, null, null));
            for (var l = 0; l < p; ++l) o.push(q);
            o.push(i)
        }
        return o
    }

    function eA(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            c.from != null && c.from == c.to && c.marker.clearWhenEmpty !== !1 && a.splice(b--, 1)
        }
        return a.length ? a : null
    }

    function eB(a, b) {
        var c = fN(a, b),
            d = ez(a, b);
        if (!c) return d;
        if (!d) return c;
        for (var e = 0; e < c.length; ++e) {
            var f = c[e],
                g = d[e];
            if (f && g) a: for (var h = 0; h < g.length; ++h) {
                var i = g[h];
                for (var j = 0; j < f.length; ++j)
                    if (f[j].marker == i.marker) continue a;
                f.push(i)
            } else g && (c[e] = g)
        }
        return c
    }

    function eC(a, b, c) {
        var d = null;
        a.iter(b.line, c.line + 1, function(a) {
            if (a.markedSpans)
                for (var b = 0; b < a.markedSpans.length; ++b) {
                    var c = a.markedSpans[b].marker;
                    c.readOnly && (!d || gs(d, c) == -1) && (d || (d = [])).push(c)
                }
        });
        if (!d) return null;
        var e = [{
            from: b,
            to: c
        }];
        for (var f = 0; f < d.length; ++f) {
            var g = d[f],
                h = g.find(0);
            for (var i = 0; i < e.length; ++i) {
                var j = e[i];
                if (bn(j.to, h.from) < 0 || bn(j.from, h.to) > 0) continue;
                var k = [i, 1],
                    l = bn(j.from, h.from),
                    m = bn(j.to, h.to);
                (l < 0 || !g.inclusiveLeft && !l) && k.push({
                    from: j.from,
                    to: h.from
                }), (m > 0 || !g.inclusiveRight && !m) && k.push({
                    from: h.to,
                    to: j.to
                }), e.splice.apply(e, k), i += k.length - 1
            }
        }
        return e
    }

    function eD(a) {
        var b = a.markedSpans;
        if (!b) return;
        for (var c = 0; c < b.length; ++c) b[c].marker.detachLine(a);
        a.markedSpans = null
    }

    function eE(a, b) {
        if (!b) return;
        for (var c = 0; c < b.length; ++c) b[c].marker.attachLine(a);
        a.markedSpans = b
    }

    function eF(a) {
        return a.inclusiveLeft ? -1 : 0
    }

    function eG(a) {
        return a.inclusiveRight ? 1 : 0
    }

    function eH(a, b) {
        var c = a.lines.length - b.lines.length;
        if (c != 0) return c;
        var d = a.find(),
            e = b.find(),
            f = bn(d.from, e.from) || eF(a) - eF(b);
        if (f) return -f;
        var g = bn(d.to, e.to) || eG(a) - eG(b);
        return g ? g : b.id - a.id
    }

    function eI(a, b) {
        var c = y && a.markedSpans,
            d;
        if (c)
            for (var e, f = 0; f < c.length; ++f) e = c[f], e.marker.collapsed && (b ? e.from : e.to) == null && (!d || eH(d, e.marker) < 0) && (d = e.marker);
        return d
    }

    function eJ(a) {
        return eI(a, !0)
    }

    function eK(a) {
        return eI(a, !1)
    }

    function eL(a, b, c, d, e) {
        var f = fv(a, b),
            g = y && f.markedSpans;
        if (g)
            for (var h = 0; h < g.length; ++h) {
                var i = g[h];
                if (!i.marker.collapsed) continue;
                var j = i.marker.find(0),
                    k = bn(j.from, c) || eF(i.marker) - eF(e),
                    l = bn(j.to, d) || eG(i.marker) - eG(e);
                if (k >= 0 && l <= 0 || k <= 0 && l >= 0) continue;
                if (k <= 0 && (bn(j.to, c) || eG(i.marker) - eF(e)) > 0 || k >= 0 && (bn(j.from, d) || eF(i.marker) - eG(e)) < 0) return !0
            }
    }

    function eM(a) {
        var b;
        while (b = eJ(a)) a = b.find(-1, !0).line;
        return a
    }

    function eN(a) {
        var b, c;
        while (b = eK(a)) a = b.find(1, !0).line, (c || (c = [])).push(a);
        return c
    }

    function eO(a, b) {
        var c = fv(a, b),
            d = eM(c);
        return c == d ? b : fz(d)
    }

    function eP(a, b) {
        if (b > a.lastLine()) return b;
        var c = fv(a, b),
            d;
        if (!eQ(a, c)) return b;
        while (d = eK(c)) c = d.find(1, !0).line;
        return fz(c) + 1
    }

    function eQ(a, b) {
        var c = y && b.markedSpans;
        if (c)
            for (var d, e = 0; e < c.length; ++e) {
                d = c[e];
                if (!d.marker.collapsed) continue;
                if (d.from == null) return !0;
                if (d.marker.widgetNode) continue;
                if (d.from == 0 && d.marker.inclusiveLeft && eR(a, b, d)) return !0
            }
    }

    function eR(a, b, c) {
        if (c.to == null) {
            var d = c.marker.find(1, !0);
            return eR(a, d.line, eu(d.line.markedSpans, c.marker))
        }
        if (c.marker.inclusiveRight && c.to == b.text.length) return !0;
        for (var e, f = 0; f < b.markedSpans.length; ++f) {
            e = b.markedSpans[f];
            if (e.marker.collapsed && !e.marker.widgetNode && e.from == c.to && (e.to == null || e.to != c.from) && (e.marker.inclusiveLeft || c.marker.inclusiveRight) && eR(a, b, e)) return !0
        }
    }

    function eT(a, b, c) {
        fB(b) < (a.curOp && a.curOp.scrollTop || a.doc.scrollTop) && dP(a, null, c)
    }

    function eU(a) {
        return a.height != null ? a.height : (gG(document.body, a.node) || gF(a.cm.display.measure, gC("div", [a.node], null, "position: relative")), a.height = a.node.offsetHeight)
    }

    function eV(a, b, c, d) {
        var e = new eS(a, c, d);
        return e.noHScroll && (a.display.alignWidgets = !0), dT(a, b, "widget", function(b) {
            var c = b.widgets || (b.widgets = []);
            e.insertAt == null ? c.push(e) : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e), e.line = b;
            if (!eQ(a.doc, b)) {
                var d = fB(b) < a.doc.scrollTop;
                fy(b, b.height + eU(e)), d && dP(a, null, e.height), a.curOp.forceUpdate = !0
            }
            return !0
        }), e
    }

    function eX(a, b, c, d) {
        a.text = b, a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null), a.order != null && (a.order = null), eD(a), eE(a, c);
        var e = d ? d(a) : 1;
        e != a.height && fy(a, e)
    }

    function eY(a) {
        a.parent = null, eD(a)
    }

    function eZ(a, b, c, d, e, f) {
        var g = c.flattenSpans;
        g == null && (g = a.options.flattenSpans);
        var h = 0,
            i = null,
            j = new en(b, a.options.tabSize),
            k;
        b == "" && c.blankLine && c.blankLine(d);
        while (!j.eol()) {
            j.pos > a.options.maxHighlightLength ? (g = !1, f && fa(a, b, d, j.pos), j.pos = b.length, k = null) : k = c.token(j, d);
            if (a.options.addModeClass) {
                var l = z.innerMode(c, d).mode.name;
                l && (k = "m-" + (k ? l + " " + k : l))
            }
            if (!g || i != k) h < j.start && e(j.start, i), h = j.start, i = k;
            j.start = j.pos
        }
        while (h < j.pos) {
            var m = Math.min(j.pos, h + 5e4);
            e(m, i), h = m
        }
    }

    function e$(a, b, c, d) {
        var e = [a.state.modeGen];
        eZ(a, b.text, a.doc.mode, c, function(a, b) {
            e.push(a, b)
        }, d);
        for (var f = 0; f < a.state.overlays.length; ++f) {
            var g = a.state.overlays[f],
                h = 1,
                i = 0;
            eZ(a, b.text, g.mode, !0, function(a, b) {
                var c = h;
                while (i < a) {
                    var d = e[h];
                    d > a && e.splice(h, 1, a, e[h + 1], d), h += 2, i = Math.min(a, d)
                }
                if (!b) return;
                if (g.opaque) e.splice(c, h - c, a, b), h = c + 2;
                else
                    for (; c < h; c += 2) {
                        var f = e[c + 1];
                        e[c + 1] = f ? f + " " + b : b
                    }
            })
        }
        return e
    }

    function e_(a, b) {
        if (!b.styles || b.styles[0] != a.state.modeGen) b.styles = e$(a, b, b.stateAfter = bU(a, fz(b)));
        return b.styles
    }

    function fa(a, b, c, d) {
        var e = a.doc.mode,
            f = new en(b, a.options.tabSize);
        f.start = f.pos = d || 0, b == "" && e.blankLine && e.blankLine(c);
        while (!f.eol() && f.pos <= a.options.maxHighlightLength) e.token(f, c), f.start = f.pos
    }

    function fd(a, b) {
        if (!a) return null;
        for (;;) {
            var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!c) break;
            a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
            var d = c[1] ? "bgClass" : "textClass";
            b[d] == null ? b[d] = c[2] : (new RegExp("(?:^|s)" + c[2] + "(?:$|s)")).test(b[d]) || (b[d] += " " + c[2])
        }
        if (/^\s*$/.test(a)) return null;
        var e = b.cm.options.addModeClass ? fc : fb;
        return e[a] || (e[a] = a.replace(/\S+/g, "cm-$&"))
    }

    function fe(a, b) {
        var c = gC("span", null, null, h ? "padding-right: .1px" : null),
            d = {
                pre: gC("pre", [c]),
                content: c,
                col: 0,
                pos: 0,
                cm: a
            };
        b.measure = {};
        for (var e = 0; e <= (b.rest ? b.rest.length : 0); e++) {
            var f = e ? b.rest[e - 1] : b.line,
                i;
            d.pos = 0, d.addToken = fg, (g || h) && a.getOption("lineWrapping") && (d.addToken = fh(d.addToken)), gO(a.display.measure) && (i = fC(f)) && (d.addToken = fi(d.addToken, i)), d.map = [], fk(f, d, e_(a, f)), d.map.length == 0 && d.map.push(0, 0, d.content.appendChild(gM(a.display.measure))), e == 0 ? (b.measure.map = d.map, b.measure.cache = {}) : ((b.measure.maps || (b.measure.maps = [])).push(d.map), (b.measure.caches || (b.measure.caches = [])).push({}))
        }
        return f$(a, "renderLine", a, b.line, d.pre), d
    }

    function ff(a) {
        var b = gC("span", "â€˘", "cm-invalidchar");
        return b.title = "\\u" + a.charCodeAt(0).toString(16), b
    }

    function fg(a, b, c, e, f, g) {
        if (!b) return;
        var h = a.cm.options.specialChars,
            i = !1;
        if (!h.test(b)) {
            a.col += b.length;
            var j = document.createTextNode(b);
            a.map.push(a.pos, a.pos + b.length, j), d && (i = !0), a.pos += b.length
        } else {
            var j = document.createDocumentFragment(),
                k = 0;
            for (;;) {
                h.lastIndex = k;
                var l = h.exec(b),
                    m = l ? l.index - k : b.length - k;
                if (m) {
                    var n = document.createTextNode(b.slice(k, k + m));
                    d ? j.appendChild(gC("span", [n])) : j.appendChild(n), a.map.push(a.pos, a.pos + m, n), a.col += m, a.pos += m
                }
                if (!l) break;
                k += m + 1;
                if (l[0] == "\t") {
                    var o = a.cm.options.tabSize,
                        p = o - a.col % o,
                        n = j.appendChild(gC("span", gp(p), "cm-tab"));
                    a.col += p
                } else {
                    var n = a.cm.options.specialCharPlaceholder(l[0]);
                    d ? j.appendChild(gC("span", [n])) : j.appendChild(n), a.col += 1
                }
                a.map.push(a.pos, a.pos + 1, n), a.pos++
            }
        }
        if (c || e || f || i) {
            var q = c || "";
            e && (q += e), f && (q += f);
            var r = gC("span", [j], q);
            return g && (r.title = g), a.content.appendChild(r)
        }
        a.content.appendChild(j)
    }

    function fh(a) {
        function b(a) {
            var b = " ";
            for (var c = 0; c < a.length - 2; ++c) b += c % 2 ? " " : " ";
            return b += " ", b
        }
        return function(c, d, e, f, g, h) {
            a(c, d.replace(/ {3,}/g, b), e, f, g, h)
        }
    }

    function fi(a, b) {
        return function(c, d, e, f, g, h) {
            e = e ? e + " cm-force-border" : "cm-force-border";
            var i = c.pos,
                j = i + d.length;
            for (;;) {
                for (var k = 0; k < b.length; k++) {
                    var l = b[k];
                    if (l.to > i && l.from <= i) break
                }
                if (l.to >= j) return a(c, d, e, f, g, h);
                a(c, d.slice(0, l.to - i), e, f, null, h), f = null, d = d.slice(l.to - i), i = l.to
            }
        }
    }

    function fj(a, b, c, d) {
        var e = !d && c.widgetNode;
        e && (a.map.push(a.pos, a.pos + b, e), a.content.appendChild(e)), a.pos += b
    }

    function fk(a, b, c) {
        var d = a.markedSpans,
            e = a.text,
            f = 0;
        if (!d) {
            for (var g = 1; g < c.length; g += 2) b.addToken(b, e.slice(f, f = c[g]), fd(c[g + 1], b));
            return
        }
        var h = e.length,
            i = 0,
            g = 1,
            j = "",
            k, l = 0,
            m, n, o, p, q;
        for (;;) {
            if (l == i) {
                m = n = o = p = "", q = null, l = Infinity;
                var r = [];
                for (var s = 0; s < d.length; ++s) {
                    var t = d[s],
                        u = t.marker;
                    t.from <= i && (t.to == null || t.to > i) ? (t.to != null && l > t.to && (l = t.to, n = ""), u.className && (m += " " + u.className), u.startStyle && t.from == i && (o += " " + u.startStyle), u.endStyle && t.to == l && (n += " " + u.endStyle), u.title && !p && (p = u.title), u.collapsed && (!q || eH(q.marker, u) < 0) && (q = t)) : t.from > i && l > t.from && (l = t.from), u.type == "bookmark" && t.from == i && u.widgetNode && r.push(u)
                }
                if (q && (q.from || 0) == i) {
                    fj(b, (q.to == null ? h + 1 : q.to) - i, q.marker, q.from == null);
                    if (q.to == null) return
                }
                if (!q && r.length)
                    for (var s = 0; s < r.length; ++s) fj(b, 0, r[s])
            }
            if (i >= h) break;
            var v = Math.min(h, l);
            for (;;) {
                if (j) {
                    var w = i + j.length;
                    if (!q) {
                        var x = w > v ? j.slice(0, v - i) : j;
                        b.addToken(b, x, k ? k + m : m, o, i + x.length == l ? n : "", p)
                    }
                    if (w >= v) {
                        j = j.slice(v - i), i = v;
                        break
                    }
                    i = w, o = ""
                }
                j = e.slice(f, f = c[g++]), k = fd(c[g++], b)
            }
        }
    }

    function fl(a, b) {
        return b.from.ch == 0 && b.to.ch == 0 && gq(b.text) == "" && (!a.cm || a.cm.options.wholeLineUpdateBefore)
    }

    function fm(a, b, c, d) {
        function e(a) {
            return c ? c[a] : null
        }

        function f(a, c, e) {
            eX(a, c, e, d), gb(a, "change", a, b)
        }
        var g = b.from,
            h = b.to,
            i = b.text,
            j = fv(a, g.line),
            k = fv(a, h.line),
            l = gq(i),
            m = e(i.length - 1),
            n = h.line - g.line;
        if (fl(a, b)) {
            for (var o = 0, p = []; o < i.length - 1; ++o) p.push(new eW(i[o], e(o), d));
            f(k, k.text, m), n && a.remove(g.line, n), p.length && a.insert(g.line, p)
        } else if (j == k)
            if (i.length == 1) f(j, j.text.slice(0, g.ch) + l + j.text.slice(h.ch), m);
            else {
                for (var p = [], o = 1; o < i.length - 1; ++o) p.push(new eW(i[o], e(o), d));
                p.push(new eW(l + j.text.slice(h.ch), m, d)), f(j, j.text.slice(0, g.ch) + i[0], e(0)), a.insert(g.line + 1, p)
            }
        else if (i.length == 1) f(j, j.text.slice(0, g.ch) + i[0] + k.text.slice(h.ch), e(0)), a.remove(g.line + 1, n);
        else {
            f(j, j.text.slice(0, g.ch) + i[0], e(0)), f(k, l + k.text.slice(h.ch), m);
            for (var o = 1, p = []; o < i.length - 1; ++o) p.push(new eW(i[o], e(o), d));
            n > 1 && a.remove(g.line + 1, n - 1), a.insert(g.line + 1, p)
        }
        gb(a, "change", a, b)
    }

    function fn(a) {
        this.lines = a, this.parent = null;
        for (var b = 0, c = 0; b < a.length; ++b) a[b].parent = this, c += a[b].height;
        this.height = c
    }

    function fo(a) {
        this.children = a;
        var b = 0,
            c = 0;
        for (var d = 0; d < a.length; ++d) {
            var e = a[d];
            b += e.chunkSize(), c += e.height, e.parent = this
        }
        this.size = b, this.height = c, this.parent = null
    }

    function ft(a, b, c) {
        function d(a, e, f) {
            if (a.linked)
                for (var g = 0; g < a.linked.length; ++g) {
                    var h = a.linked[g];
                    if (h.doc == e) continue;
                    var i = f && h.sharedHist;
                    if (c && !i) continue;
                    b(h.doc, i), d(h.doc, a, i)
                }
        }
        d(a, null, !0)
    }

    function fu(a, b) {
        if (b.cm) throw new Error("This document is already in use.");
        a.doc = b, b.cm = a, F(a), B(a), a.options.lineWrapping || L(a), a.options.mode = b.modeOption, cE(a)
    }

    function fv(a, b) {
        b -= a.first;
        if (b < 0 || b >= a.size) throw new Error("There is no line " + (b + a.first) + " in the document.");
        for (var c = a; !c.lines;)
            for (var d = 0;; ++d) {
                var e = c.children[d],
                    f = e.chunkSize();
                if (b < f) {
                    c = e;
                    break
                }
                b -= f
            }
        return c.lines[b]
    }

    function fw(a, b, c) {
        var d = [],
            e = b.line;
        return a.iter(b.line, c.line + 1, function(a) {
            var f = a.text;
            e == c.line && (f = f.slice(0, c.ch)), e == b.line && (f = f.slice(b.ch)), d.push(f), ++e
        }), d
    }

    function fx(a, b, c) {
        var d = [];
        return a.iter(b, c, function(a) {
            d.push(a.text)
        }), d
    }

    function fy(a, b) {
        var c = b - a.height;
        if (c)
            for (var d = a; d; d = d.parent) d.height += c
    }

    function fz(a) {
        if (a.parent == null) return null;
        var b = a.parent,
            c = gs(b.lines, a);
        for (var d = b.parent; d; b = d, d = d.parent)
            for (var e = 0;; ++e) {
                if (d.children[e] == b) break;
                c += d.children[e].chunkSize()
            }
        return c + b.first
    }

    function fA(a, b) {
        var c = a.first;
        a: do {
            for (var d = 0; d < a.children.length; ++d) {
                var e = a.children[d],
                    f = e.height;
                if (b < f) {
                    a = e;
                    continue a
                }
                b -= f, c += e.chunkSize()
            }
            return c
        } while (!a.lines);
        for (var d = 0; d < a.lines.length; ++d) {
            var g = a.lines[d],
                h = g.height;
            if (b < h) break;
            b -= h
        }
        return c + d
    }

    function fB(a) {
        a = eM(a);
        var b = 0,
            c = a.parent;
        for (var d = 0; d < c.lines.length; ++d) {
            var e = c.lines[d];
            if (e == a) break;
            b += e.height
        }
        for (var f = c.parent; f; c = f, f = c.parent)
            for (var d = 0; d < f.children.length; ++d) {
                var g = f.children[d];
                if (g == c) break;
                b += g.height
            }
        return b
    }

    function fC(a) {
        var b = a.order;
        return b == null && (b = a.order = he(a.text)), b
    }

    function fD(a) {
        this.done = [], this.undone = [], this.undoDepth = Infinity, this.lastModTime = this.lastSelTime = 0, this.lastOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = a || 1
    }

    function fE(a, b) {
        var c = {
            from: bo(b.from),
            to: dy(b),
            text: fw(a, b.from, b.to)
        };
        return fL(a, c, b.from.line, b.to.line + 1), ft(a, function(a) {
            fL(a, c, b.from.line, b.to.line + 1)
        }, !0), c
    }

    function fF(a) {
        while (a.length) {
            var b = gq(a);
            if (b.ranges) a.pop();
            else break
        }
    }

    function fG(a, b) {
        if (b) return fF(a.done), gq(a.done);
        if (a.done.length && !gq(a.done).ranges) return gq(a.done);
        if (a.done.length > 1 && !a.done[a.done.length - 2].ranges) return a.done.pop(), gq(a.done)
    }

    function fH(a, b, c, d) {
        var e = a.history;
        e.undone.length = 0;
        var f = +(new Date),
            g;
        if ((e.lastOp == d || e.lastOrigin == b.origin && b.origin && (b.origin.charAt(0) == "+" && a.cm && e.lastModTime > f - a.cm.options.historyEventDelay || b.origin.charAt(0) == "*")) && (g = fG(e, e.lastOp == d))) {
            var h = gq(g.changes);
            bn(b.from, b.to) == 0 && bn(b.from, h.to) == 0 ? h.to = dy(b) : g.changes.push(fE(a, b))
        } else {
            var i = gq(e.done);
            (!i || !i.ranges) && fK(a.sel, e.done), g = {
                changes: [fE(a, b)],
                generation: e.generation
            }, e.done.push(g);
            while (e.done.length > e.undoDepth) e.done.shift(), e.done[0].ranges || e.done.shift()
        }
        e.done.push(c), e.generation = ++e.maxGeneration, e.lastModTime = e.lastSelTime = f, e.lastOp = d, e.lastOrigin = e.lastSelOrigin = b.origin, h || f$(a, "historyAdded")
    }

    function fI(a, b, c, d) {
        var e = b.charAt(0);
        return e == "*" || e == "+" && c.ranges.length == d.ranges.length && c.somethingSelected() == d.somethingSelected() && new Date - a.history.lastSelTime <= (a.cm ? a.cm.options.historyEventDelay : 500)
    }

    function fJ(a, b, c, d) {
        var e = a.history,
            f = d && d.origin;
        c == e.lastOp || f && e.lastSelOrigin == f && (e.lastModTime == e.lastSelTime && e.lastOrigin == f || fI(a, f, gq(e.done), b)) ? e.done[e.done.length - 1] = b : fK(b, e.done), e.lastSelTime = +(new Date), e.lastSelOrigin = f, e.lastOp = c, d && d.clearRedo !== !1 && fF(e.undone)
    }

    function fK(a, b) {
        var c = gq(b);
        c && c.ranges && c.equals(a) || b.push(a)
    }

    function fL(a, b, c, d) {
        var e = b["spans_" + a.id],
            f = 0;
        a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function(c) {
            c.markedSpans && ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans), ++f
        })
    }

    function fM(a) {
        if (!a) return null;
        for (var b = 0, c; b < a.length; ++b) a[b].marker.explicitlyCleared ? c || (c = a.slice(0, b)) : c && c.push(a[b]);
        return c ? c.length ? c : null : a
    }

    function fN(a, b) {
        var c = b["spans_" + a.id];
        if (!c) return null;
        for (var d = 0, e = []; d < b.text.length; ++d) e.push(fM(c[d]));
        return e
    }

    function fO(a, b, c) {
        for (var d = 0, e = []; d < a.length; ++d) {
            var f = a[d];
            if (f.ranges) {
                e.push(c ? br.prototype.deepCopy.call(f) : f);
                continue
            }
            var g = f.changes,
                h = [];
            e.push({
                changes: h
            });
            for (var i = 0; i < g.length; ++i) {
                var j = g[i],
                    k;
                h.push({
                    from: j.from,
                    to: j.to,
                    text: j.text
                });
                if (b)
                    for (var l in j)(k = l.match(/^spans_(\d+)$/)) && gs(b, Number(k[1])) > -1 && (gq(h)[l] = j[l], delete j[l])
            }
        }
        return e
    }

    function fP(a, b, c, d) {
        c < a.line ? a.line += d : b < a.line && (a.line = b, a.ch = 0)
    }

    function fQ(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e],
                g = !0;
            if (f.ranges) {
                f.copied || (f = a[e] = f.deepCopy(), f.copied = !0);
                for (var h = 0; h < f.ranges.length; h++) fP(f.ranges[h].anchor, b, c, d), fP(f.ranges[h].head, b, c, d);
                continue
            }
            for (var h = 0; h < f.changes.length; ++h) {
                var i = f.changes[h];
                if (c < i.from.line) i.from = bm(i.from.line + d, i.from.ch), i.to = bm(i.to.line + d, i.to.ch);
                else if (b <= i.to.line) {
                    g = !1;
                    break
                }
            }
            g || (a.splice(0, e + 1), e = 0)
        }
    }

    function fR(a, b) {
        var c = b.from.line,
            d = b.to.line,
            e = b.text.length - (d - c) - 1;
        fQ(a.done, c, d, e), fQ(a.undone, c, d, e)
    }

    function fU(a) {
        return a.defaultPrevented != null ? a.defaultPrevented : a.returnValue == 0
    }

    function fW(a) {
        return a.target || a.srcElement
    }

    function fX(a) {
        var b = a.which;
        return b == null && (a.button & 1 ? b = 1 : a.button & 2 ? b = 3 : a.button & 4 && (b = 2)), s && a.ctrlKey && b == 1 && (b = 3), b
    }

    function gb(a, b) {
        function e(a) {
            return function() {
                a.apply(null, d)
            }
        }
        var c = a._handlers && a._handlers[b];
        if (!c) return;
        var d = Array.prototype.slice.call(arguments, 2);
        f_ || (++ga, f_ = [], setTimeout(gc, 0));
        for (var f = 0; f < c.length; ++f) f_.push(e(c[f]))
    }

    function gc() {
        --ga;
        var a = f_;
        f_ = null;
        for (var b = 0; b < a.length; ++b) a[b]()
    }

    function gd(a, b, c) {
        return f$(a, c || b.type, a, b), fU(b) || b.codemirrorIgnore
    }

    function ge(a, b) {
        var c = a._handlers && a._handlers[b];
        return c && c.length > 0
    }

    function gf(a) {
        a.prototype.on = function(a, b) {
            fY(this, a, b)
        }, a.prototype.off = function(a, b) {
            fZ(this, a, b)
        }
    }

    function gl() {
        this.id = null
    }

    function gn(a, b, c) {
        for (var d = 0, e = 0;;) {
            var f = a.indexOf("\t", d);
            f == -1 && (f = a.length);
            var g = f - d;
            if (f == a.length || e + g >= b) return d + Math.min(g, b - e);
            e += f - d, e += c - e % c, d = f + 1;
            if (e >= b) return d
        }
    }

    function gp(a) {
        while (go.length <= a) go.push(gq(go) + " ");
        return go[a]
    }

    function gq(a) {
        return a[a.length - 1]
    }

    function gs(a, b) {
        for (var c = 0; c < a.length; ++c)
            if (a[c] == b) return c;
        return -1
    }

    function gt(a, b) {
        var c = [];
        for (var d = 0; d < a.length; d++) c[d] = b(a[d], d);
        return c
    }

    function gu(a, b) {
        var c;
        if (Object.create) c = Object.create(a);
        else {
            var d = function() {};
            d.prototype = a, c = new d
        }
        return b && gv(b, c), c
    }

    function gv(a, b) {
        b || (b = {});
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }

    function gw(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return function() {
            return a.apply(null, b)
        }
    }

    function gz(a) {
        for (var b in a)
            if (a.hasOwnProperty(b) && a[b]) return !1;
        return !0
    }

    function gB(a) {
        return a.charCodeAt(0) >= 768 && gA.test(a)
    }

    function gC(a, b, c, d) {
        var e = document.createElement(a);
        c && (e.className = c), d && (e.style.cssText = d);
        if (typeof b == "string") e.appendChild(document.createTextNode(b));
        else if (b)
            for (var f = 0; f < b.length; ++f) e.appendChild(b[f]);
        return e
    }

    function gE(a) {
        for (var b = a.childNodes.length; b > 0; --b) a.removeChild(a.firstChild);
        return a
    }

    function gF(a, b) {
        return gE(a).appendChild(b)
    }

    function gG(a, b) {
        if (a.contains) return a.contains(b);
        while (b = b.parentNode)
            if (b == a) return !0
    }

    function gH() {
        return document.activeElement
    }

    function gK(a) {
        if (gJ != null) return gJ;
        var b = gC("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        return gF(a, b), b.offsetWidth && (gJ = b.offsetHeight - b.clientHeight), gJ || 0
    }

    function gM(a) {
        if (gL == null) {
            var b = gC("span", "â€‹");
            gF(a, gC("span", [b, document.createTextNode("x")])), a.firstChild.offsetHeight != 0 && (gL = b.offsetWidth <= 1 && b.offsetHeight > 2 && !c)
        }
        return gL ? gC("span", "â€‹") : gC("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
    }

    function gO(a) {
        if (gN != null) return gN;
        var b = gF(a, document.createTextNode("AŘ®A")),
            c = gD(b, 0, 1).getBoundingClientRect();
        if (c.left == c.right) return !1;
        var d = gD(b, 1, 2).getBoundingClientRect();
        return gN = d.right - c.right < 3
    }

    function gT(a, b, c, d) {
        if (!a) return d(b, c, "ltr");
        var e = !1;
        for (var f = 0; f < a.length; ++f) {
            var g = a[f];
            if (g.from < c && g.to > b || b == c && g.to == b) d(Math.max(g.from, b), Math.min(g.to, c), g.level == 1 ? "rtl" : "ltr"), e = !0
        }
        e || d(b, c, "ltr")
    }

    function gU(a) {
        return a.level % 2 ? a.to : a.from
    }

    function gV(a) {
        return a.level % 2 ? a.from : a.to
    }

    function gW(a) {
        var b = fC(a);
        return b ? gU(b[0]) : 0
    }

    function gX(a) {
        var b = fC(a);
        return b ? gV(gq(b)) : a.text.length
    }

    function gY(a, b) {
        var c = fv(a.doc, b),
            d = eM(c);
        d != c && (b = fz(d));
        var e = fC(d),
            f = e ? e[0].level % 2 ? gX(d) : gW(d) : 0;
        return bm(b, f)
    }

    function gZ(a, b) {
        var c, d = fv(a.doc, b);
        while (c = eK(d)) d = c.find(1, !0).line, b = null;
        var e = fC(d),
            f = e ? e[0].level % 2 ? gW(d) : gX(d) : d.text.length;
        return bm(b == null ? fz(d) : b, f)
    }

    function g$(a, b, c) {
        var d = a[0].level;
        return b == d ? !0 : c == d ? !1 : b < c
    }

    function ha(a, b) {
        g_ = null;
        for (var c = 0, d; c < a.length; ++c) {
            var e = a[c];
            if (e.from < b && e.to > b) return c;
            if (e.from == b || e.to == b)
                if (d == null) d = c;
                else return g$(a, e.level, a[d].level) ? (e.from != e.to && (g_ = d), c) : (e.from != e.to && (g_ = c), d)
        }
        return d
    }

    function hb(a, b, c, d) {
        if (!d) return b + c;
        do b += c; while (b > 0 && gB(a.text.charAt(b)));
        return b
    }

    function hc(a, b, c, d) {
        var e = fC(a);
        if (!e) return hd(a, b, c, d);
        var f = ha(e, b),
            g = e[f],
            h = hb(a, b, g.level % 2 ? -c : c, d);
        for (;;) {
            if (h > g.from && h < g.to) return h;
            if (h == g.from || h == g.to) return ha(e, h) == f ? h : (g = e[f += c], c > 0 == g.level % 2 ? g.to : g.from);
            g = e[f += c];
            if (!g) return null;
            c > 0 == g.level % 2 ? h = hb(a, g.to, -1, d) : h = hb(a, g.from, 1, d)
        }
    }

    function hd(a, b, c, d) {
        var e = b + c;
        if (d)
            while (e > 0 && gB(a.text.charAt(e))) e += c;
        return e < 0 || e > a.text.length ? null : e
    }
    "use strict";
    var a = /gecko\/\d/i.test(navigator.userAgent),
        b = /MSIE \d/.test(navigator.userAgent),
        c = b && (document.documentMode == null || document.documentMode < 8),
        d = b && (document.documentMode == null || document.documentMode < 9),
        e = b && (document.documentMode == null || document.documentMode < 10),
        f = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent),
        g = b || f,
        h = /WebKit\//.test(navigator.userAgent),
        i = h && /Qt\/\d+\.\d+/.test(navigator.userAgent),
        j = /Chrome\//.test(navigator.userAgent),
        k = /Opera\//.test(navigator.userAgent),
        l = /Apple Computer/.test(navigator.vendor),
        m = /KHTML\//.test(navigator.userAgent),
        n = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
        o = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
        p = /PhantomJS/.test(navigator.userAgent),
        q = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
        r = q || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
        s = q || /Mac/.test(navigator.platform),
        t = /win/i.test(navigator.platform),
        u = k && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    u && (u = Number(u[1])), u && u >= 15 && (k = !1, h = !0);
    var v = s && (i || k && (u == null || u < 12.11)),
        w = a || g && !d,
        x = !1,
        y = !1,
        bm = z.Pos = function(a, b) {
            if (this instanceof bm) this.line = a, this.ch = b;
            else return new bm(a, b)
        },
        bn = z.cmpPos = function(a, b) {
            return a.line - b.line || a.ch - b.ch
        };
    br.prototype = {
        primary: function() {
            return this.ranges[this.primIndex]
        },
        equals: function(a) {
            if (a == this) return !0;
            if (a.primIndex != this.primIndex || a.ranges.length != this.ranges.length) return !1;
            for (var b = 0; b < this.ranges.length; b++) {
                var c = this.ranges[b],
                    d = a.ranges[b];
                if (bn(c.anchor, d.anchor) != 0 || bn(c.head, d.head) != 0) return !1
            }
            return !0
        },
        deepCopy: function() {
            for (var a = [], b = 0; b < this.ranges.length; b++) a[b] = new bs(bo(this.ranges[b].anchor), bo(this.ranges[b].head));
            return new br(a, this.primIndex)
        },
        somethingSelected: function() {
            for (var a = 0; a < this.ranges.length; a++)
                if (!this.ranges[a].empty()) return !0;
            return !1
        },
        contains: function(a, b) {
            b || (b = a);
            for (var c = 0; c < this.ranges.length; c++) {
                var d = this.ranges[c];
                if (bn(b, d.from()) >= 0 && bn(a, d.to()) <= 0) return c
            }
            return -1
        }
    }, bs.prototype = {
        from: function() {
            return bq(this.anchor, this.head)
        },
        to: function() {
            return bp(this.anchor, this.head)
        },
        empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        }
    };
    var cd = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        cs, cv = 0,
        cW, cX, db = 0,
        dg = 0,
        dh = null;
    g ? dh = -0.53 : a ? dh = 15 : j ? dh = -0.7 : l && (dh = -1 / 3);
    var dl, dp = null,
        dv, dy = z.changeEnd = function(a) {
            return a.text ? bm(a.from.line + a.text.length - 1, gq(a.text).length + (a.text.length == 1 ? a.from.ch : 0)) : a.to
        };
    z.prototype = {
        constructor: z,
        posFromMouse: function(a) {
            return cU(this, a, !0)
        },
        focus: function() {
            window.focus(), cP(this), cM(this)
        },
        setOption: function(a, b) {
            var c = this.options,
                d = c[a];
            if (c[a] == b && a != "mode") return;
            c[a] = b, dZ.hasOwnProperty(a) && cz(this, dZ[a])(this, b, d)
        },
        getOption: function(a) {
            return this.options[a]
        },
        getDoc: function() {
            return this.doc
        },
        addKeyMap: function(a, b) {
            this.state.keyMaps[b ? "push" : "unshift"](a)
        },
        removeKeyMap: function(a) {
            var b = this.state.keyMaps;
            for (var c = 0; c < b.length; ++c)
                if (b[c] == a || typeof b[c] != "string" && b[c].name == a) return b.splice(c, 1), !0
        },
        addOverlay: cA(function(a, b) {
            var c = a.token ? a : z.getMode(this.options, a);
            if (c.startState) throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: c,
                modeSpec: a,
                opaque: b && b.opaque
            }), this.state.modeGen++, cE(this)
        }),
        removeOverlay: cA(function(a) {
            var b = this.state.overlays;
            for (var c = 0; c < b.length; ++c) {
                var d = b[c].modeSpec;
                if (d == a || typeof a == "string" && d.name == a) {
                    b.splice(c, 1), this.state.modeGen++, cE(this);
                    return
                }
            }
        }),
        indentLine: cA(function(a, b, c) {
            typeof b != "string" && typeof b != "number" && (b == null ? b = this.options.smartIndent ? "smart" : "prev" : b = b ? "add" : "subtract"), by(this.doc, a) && dS(this, a, b, c)
        }),
        indentSelection: cA(function(a) {
            var b = this.doc.sel.ranges,
                c = -1;
            for (var d = 0; d < b.length; d++) {
                var e = b[d];
                if (!e.empty()) {
                    var f = Math.max(c, e.from().line),
                        g = e.to();
                    c = Math.min(this.lastLine(), g.line - (g.ch ? 0 : 1)) + 1;
                    for (var h = f; h < c; ++h) dS(this, h, a)
                } else e.head.line > c && (dS(this, e.head.line, a, !0), c = e.head.line, d == this.doc.sel.primIndex && dQ(this))
            }
        }),
        getTokenAt: function(a, b) {
            var c = this.doc;
            a = bw(c, a);
            var d = bU(this, a.line, b),
                e = this.doc.mode,
                f = fv(c, a.line),
                g = new en(f.text, this.options.tabSize);
            while (g.pos < a.ch && !g.eol()) {
                g.start = g.pos;
                var h = e.token(g, d)
            }
            return {
                start: g.start,
                end: g.pos,
                string: g.current(),
                type: h || null,
                state: d
            }
        },
        getTokenTypeAt: function(a) {
            a = bw(this.doc, a);
            var b = e_(this, fv(this.doc, a.line)),
                c = 0,
                d = (b.length - 1) / 2,
                e = a.ch;
            if (e == 0) return b[2];
            for (;;) {
                var f = c + d >> 1;
                if ((f ? b[f * 2 - 1] : 0) >= e) d = f;
                else if (b[f * 2 + 1] < e) c = f + 1;
                else return b[f * 2 + 2]
            }
        },
        getModeAt: function(a) {
            var b = this.doc.mode;
            return b.innerMode ? z.innerMode(b, this.getTokenAt(a).state).mode : b
        },
        getHelper: function(a, b) {
            return this.getHelpers(a, b)[0]
        },
        getHelpers: function(a, b) {
            var c = [];
            if (!ee.hasOwnProperty(b)) return ee;
            var d = ee[b],
                e = this.getModeAt(a);
            if (typeof e[b] == "string") d[e[b]] && c.push(d[e[b]]);
            else if (e[b])
                for (var f = 0; f < e[b].length; f++) {
                    var g = d[e[b][f]];
                    g && c.push(g)
                } else e.helperType && d[e.helperType] ? c.push(d[e.helperType]) : d[e.name] && c.push(d[e.name]);
            for (var f = 0; f < d._global.length; f++) {
                var h = d._global[f];
                h.pred(e, this) && gs(c, h.val) == -1 && c.push(h.val)
            }
            return c
        },
        getStateAfter: function(a, b) {
            var c = this.doc;
            return a = bv(c, a == null ? c.first + c.size - 1 : a), bU(this, a + 1, b)
        },
        cursorCoords: function(a, b) {
            var c, d = this.doc.sel.primary();
            return a == null ? c = d.head : typeof a == "object" ? c = bw(this.doc, a) : c = a ? d.from() : d.to(), cn(this, c, b || "page")
        },
        charCoords: function(a, b) {
            return cm(this, bw(this.doc, a), b || "page")
        },
        coordsChar: function(a, b) {
            return a = cl(this, a, b || "page"), cq(this, a.left, a.top)
        },
        lineAtHeight: function(a, b) {
            return a = cl(this, {
                top: a,
                left: 0
            }, b || "page").top, fA(this.doc, a + this.display.viewOffset)
        },
        heightAtLine: function(a, b) {
            var c = !1,
                d = this.doc.first + this.doc.size - 1;
            a < this.doc.first ? a = this.doc.first : a > d && (a = d, c = !0);
            var e = fv(this.doc, a);
            return ck(this, e, {
                top: 0,
                left: 0
            }, b || "page").top + (c ? this.doc.height - fB(e) : 0)
        },
        defaultTextHeight: function() {
            return ct(this.display)
        },
        defaultCharWidth: function() {
            return cu(this.display)
        },
        setGutterMarker: cA(function(a, b, c) {
            return dT(this, a, "gutter", function(a) {
                var d = a.gutterMarkers || (a.gutterMarkers = {});
                return d[b] = c, !c && gz(d) && (a.gutterMarkers = null), !0
            })
        }),
        clearGutter: cA(function(a) {
            var b = this,
                c = b.doc,
                d = c.first;
            c.iter(function(c) {
                c.gutterMarkers && c.gutterMarkers[a] && (c.gutterMarkers[a] = null, cF(b, d, "gutter"), gz(c.gutterMarkers) && (c.gutterMarkers = null)), ++d
            })
        }),
        addLineClass: cA(function(a, b, c) {
            return dT(this, a, "class", function(a) {
                var d = b == "text" ? "textClass" : b == "background" ? "bgClass" : "wrapClass";
                if (!a[d]) a[d] = c;
                else {
                    if ((new RegExp("(?:^|\\s)" + c + "(?:$|\\s)")).test(a[d])) return !1;
                    a[d] += " " + c
                }
                return !0
            })
        }),
        removeLineClass: cA(function(a, b, c) {
            return dT(this, a, "class", function(a) {
                var d = b == "text" ? "textClass" : b == "background" ? "bgClass" : "wrapClass",
                    e = a[d];
                if (!e) return !1;
                if (c == null) a[d] = null;
                else {
                    var f = e.match(new RegExp("(?:^|\\s+)" + c + "(?:$|\\s+)"));
                    if (!f) return !1;
                    var g = f.index + f[0].length;
                    a[d] = e.slice(0, f.index) + (!f.index || g == e.length ? "" : " ") + e.slice(g) || null
                }
                return !0
            })
        }),
        addLineWidget: cA(function(a, b, c) {
            return eV(this, a, b, c)
        }),
        removeLineWidget: function(a) {
            a.clear()
        },
        lineInfo: function(a) {
            if (typeof a == "number") {
                if (!by(this.doc, a)) return null;
                var b = a;
                a = fv(this.doc, a);
                if (!a) return null
            } else {
                var b = fz(a);
                if (b == null) return null
            }
            return {
                line: b,
                handle: a,
                text: a.text,
                gutterMarkers: a.gutterMarkers,
                textClass: a.textClass,
                bgClass: a.bgClass,
                wrapClass: a.wrapClass,
                widgets: a.widgets
            }
        },
        getViewport: function() {
            return {
                from: this.display.viewFrom,
                to: this.display.viewTo
            }
        },
        addWidget: function(a, b, c, d, e) {
            var f = this.display;
            a = cn(this, bw(this.doc, a));
            var g = a.bottom,
                h = a.left;
            b.style.position = "absolute", f.sizer.appendChild(b);
            if (d == "over") g = a.top;
            else if (d == "above" || d == "near") {
                var i = Math.max(f.wrapper.clientHeight, this.doc.height),
                    j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
                (d == "above" || a.bottom + b.offsetHeight > i) && a.top > b.offsetHeight ? g = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= i && (g = a.bottom), h + b.offsetWidth > j && (h = j - b.offsetWidth)
            }
            b.style.top = g + "px", b.style.left = b.style.right = "", e == "right" ? (h = f.sizer.clientWidth - b.offsetWidth, b.style.right = "0px") : (e == "left" ? h = 0 : e == "middle" && (h = (f.sizer.clientWidth - b.offsetWidth) / 2), b.style.left = h + "px"), c && dN(this, h, g, h + b.offsetWidth, g + b.offsetHeight)
        },
        triggerOnKeyDown: cA(dq),
        triggerOnKeyPress: cA(ds),
        triggerOnKeyUp: cA(dr),
        execCommand: function(a) {
            if (eh.hasOwnProperty(a)) return eh[a](this)
        },
        findPosH: function(a, b, c, d) {
            var e = 1;
            b < 0 && (e = -1, b = -b);
            for (var f = 0, g = bw(this.doc, a); f < b; ++f) {
                g = dV(this.doc, g, e, c, d);
                if (g.hitSide) break
            }
            return g
        },
        moveH: cA(function(a, b) {
            var c = this;
            c.extendSelectionsBy(function(d) {
                return c.display.shift || c.doc.extend || d.empty() ? dV(c.doc, d.head, a, b, c.options.rtlMoveVisually) : a < 0 ? d.from() : d.to()
            }, gk)
        }),
        deleteH: cA(function(a, b) {
            var c = this.doc.sel,
                d = this.doc;
            c.somethingSelected() ? d.replaceSelection("", null, "+delete") : dU(this, function(c) {
                var e = dV(d, c.head, a, b, !1);
                return a < 0 ? {
                    from: e,
                    to: c.head
                } : {
                    from: c.head,
                    to: e
                }
            })
        }),
        findPosV: function(a, b, c, d) {
            var e = 1,
                f = d;
            b < 0 && (e = -1, b = -b);
            for (var g = 0, h = bw(this.doc, a); g < b; ++g) {
                var i = cn(this, h, "div");
                f == null ? f = i.left : i.left = f, h = dW(this, i, e, c);
                if (h.hitSide) break
            }
            return h
        },
        moveV: cA(function(a, b) {
            var c = this,
                d = this.doc,
                e = [],
                f = !c.display.shift && !d.extend && d.sel.somethingSelected();
            d.extendSelectionsBy(function(g) {
                if (f) return a < 0 ? g.from() : g.to();
                var h = cn(c, g.head, "div");
                g.goalColumn != null && (h.left = g.goalColumn), e.push(h.left);
                var i = dW(c, h, a, b);
                return b == "page" && g == d.sel.primary() && dP(c, null, cm(c, i, "div").top - h.top), i
            }, gk);
            if (e.length)
                for (var g = 0; g < d.sel.ranges.length; g++) d.sel.ranges[g].goalColumn = e[g]
        }),
        toggleOverwrite: function(a) {
            if (a != null && a == this.state.overwrite) return;
            (this.state.overwrite = !this.state.overwrite) ? this.display.cursorDiv.className += " CodeMirror-overwrite": this.display.cursorDiv.className = this.display.cursorDiv.className.replace(" CodeMirror-overwrite", ""), f$(this, "overwriteToggle", this, this.state.overwrite)
        },
        hasFocus: function() {
            return gH() == this.display.input
        },
        scrollTo: cA(function(a, b) {
            (a != null || b != null) && dR(this), a != null && (this.curOp.scrollLeft = a), b != null && (this.curOp.scrollTop = b)
        }),
        getScrollInfo: function() {
            var a = this.display.scroller,
                b = gg;
            return {
                left: a.scrollLeft,
                top: a.scrollTop,
                height: a.scrollHeight - b,
                width: a.scrollWidth - b,
                clientHeight: a.clientHeight - b,
                clientWidth: a.clientWidth - b
            }
        },
        scrollIntoView: cA(function(a, b) {
            a == null ? (a = {
                from: this.doc.sel.primary().head,
                to: null
            }, b == null && (b = this.options.cursorScrollMargin)) : typeof a == "number" ? a = {
                from: bm(a, 0),
                to: null
            } : a.from == null && (a = {
                from: a,
                to: null
            }), a.to || (a.to = a.from), a.margin = b || 0;
            if (a.from.line != null) dR(this), this.curOp.scrollToPos = a;
            else {
                var c = dO(this, Math.min(a.from.left, a.to.left), Math.min(a.from.top, a.to.top) - a.margin, Math.max(a.from.right, a.to.right), Math.max(a.from.bottom, a.to.bottom) + a.margin);
                this.scrollTo(c.scrollLeft, c.scrollTop)
            }
        }),
        setSize: cA(function(a, b) {
            function c(a) {
                return typeof a == "number" || /^\d+$/.test(String(a)) ? a + "px" : a
            }
            a != null && (this.display.wrapper.style.width = c(a)), b != null && (this.display.wrapper.style.height = c(b)), this.options.lineWrapping && cg(this), this.curOp.forceUpdate = !0, f$(this, "refresh", this)
        }),
        operation: function(a) {
            return cy(this, a)
        },
        refresh: cA(function() {
            var a = this.display.cachedTextHeight;
            cE(this), ch(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), (a == null || Math.abs(a - ct(this.display)) > .5) && F(this), f$(this, "refresh", this)
        }),
        swapDoc: cA(function(a) {
            var b = this.doc;
            return b.cm = null, fu(this, a), ch(this), cO(this), this.scrollTo(a.scrollLeft, a.scrollTop), gb(this, "swapDoc", this, b), b
        }),
        getInputField: function() {
            return this.display.input
        },
        getWrapperElement: function() {
            return this.display.wrapper
        },
        getScrollerElement: function() {
            return this.display.scroller
        },
        getGutterElement: function() {
            return this.display.gutters
        }
    }, gf(z);
    var dY = z.defaults = {},
        dZ = z.optionHandlers = {},
        d_ = z.Init = {
            toString: function() {
                return "CodeMirror.Init"
            }
        };
    d$("value", "", function(a, b) {
        a.setValue(b)
    }, !0), d$("mode", null, function(a, b) {
        a.doc.modeOption = b, B(a)
    }, !0), d$("indentUnit", 2, B, !0), d$("indentWithTabs", !1), d$("smartIndent", !0), d$("tabSize", 4, function(a) {
        C(a), ch(a), cE(a)
    }, !0), d$("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(a, b) {
        a.options.specialChars = new RegExp(b.source + (b.test("\t") ? "" : "|\t"), "g"), a.refresh()
    }, !0), d$("specialCharPlaceholder", ff, function(a) {
        a.refresh()
    }, !0), d$("electricChars", !0), d$("rtlMoveVisually", !t), d$("wholeLineUpdateBefore", !0), d$("theme", "default", function(a) {
        H(a), I(a)
    }, !0), d$("keyMap", "default", G), d$("extraKeys", null), d$("lineWrapping", !1, D, !0), d$("gutters", [], function(a) {
        M(a.options), I(a)
    }, !0), d$("fixedGutter", !0, function(a, b) {
        a.display.gutters.style.left = b ? T(a.display) + "px" : "0", a.refresh()
    }, !0), d$("coverGutterNextToScrollbar", !1, O, !0), d$("lineNumbers", !1, function(a) {
        M(a.options), I(a)
    }, !0), d$("firstLineNumber", 1, I, !0), d$("lineNumberFormatter", function(a) {
        return a
    }, I, !0), d$("showCursorWhenSelecting", !1, bN, !0), d$("resetSelectionOnContextMenu", !0), d$("readOnly", !1, function(a, b) {
        b == "nocursor" ? (du(a), a.display.input.blur(), a.display.disabled = !0) : (a.display.disabled = !1, b || cO(a))
    }), d$("disableInput", !1, function(a, b) {
        b || cO(a)
    }, !0), d$("dragDrop", !0), d$("cursorBlinkRate", 530), d$("cursorScrollMargin", 0), d$("cursorHeight", 1), d$("workTime", 100), d$("workDelay", 100), d$("flattenSpans", !0, C, !0), d$("addModeClass", !1, C, !0), d$("pollInterval", 100), d$("undoDepth", 200, function(a, b) {
        a.doc.history.undoDepth = b
    }), d$("historyEventDelay", 1250), d$("viewportMargin", 10, function(a) {
        a.refresh()
    }, !0), d$("maxHighlightLength", 1e4, C, !0), d$("moveInputWithCursor", !0, function(a, b) {
        b || (a.display.inputDiv.style.top = a.display.inputDiv.style.left = 0)
    }), d$("tabindex", null, function(a, b) {
        a.display.input.tabIndex = b || ""
    }), d$("autofocus", null);
    var ea = z.modes = {},
        eb = z.mimeModes = {};
    z.defineMode = function(a, b) {
        !z.defaults.mode && a != "null" && (z.defaults.mode = a);
        if (arguments.length > 2) {
            b.dependencies = [];
            for (var c = 2; c < arguments.length; ++c) b.dependencies.push(arguments[c])
        }
        ea[a] = b
    }, z.defineMIME = function(a, b) {
        eb[a] = b
    }, z.resolveMode = function(a) {
        if (typeof a == "string" && eb.hasOwnProperty(a)) a = eb[a];
        else if (a && typeof a.name == "string" && eb.hasOwnProperty(a.name)) {
            var b = eb[a.name];
            typeof b == "string" && (b = {
                name: b
            }), a = gu(b, a), a.name = b.name
        } else if (typeof a == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(a)) return z.resolveMode("application/xml");
        return typeof a == "string" ? {
            name: a
        } : a || {
            name: "null"
        }
    }, z.getMode = function(a, b) {
        var b = z.resolveMode(b),
            c = ea[b.name];
        if (!c) return z.getMode(a, "text/plain");
        var d = c(a, b);
        if (ec.hasOwnProperty(b.name)) {
            var e = ec[b.name];
            for (var f in e) {
                if (!e.hasOwnProperty(f)) continue;
                d.hasOwnProperty(f) && (d["_" + f] = d[f]), d[f] = e[f]
            }
        }
        d.name = b.name, b.helperType && (d.helperType = b.helperType);
        if (b.modeProps)
            for (var f in b.modeProps) d[f] = b.modeProps[f];
        return d
    }, z.defineMode("null", function() {
        return {
            token: function(a) {
                a.skipToEnd()
            }
        }
    }), z.defineMIME("text/plain", "null");
    var ec = z.modeExtensions = {};
    z.extendMode = function(a, b) {
        var c = ec.hasOwnProperty(a) ? ec[a] : ec[a] = {};
        gv(b, c)
    }, z.defineExtension = function(a, b) {
        z.prototype[a] = b
    }, z.defineDocExtension = function(a, b) {
        fq.prototype[a] = b
    }, z.defineOption = d$;
    var ed = [];
    z.defineInitHook = function(a) {
        ed.push(a)
    };
    var ee = z.helpers = {};
    z.registerHelper = function(a, b, c) {
        ee.hasOwnProperty(a) || (ee[a] = z[a] = {
            _global: []
        }), ee[a][b] = c
    }, z.registerGlobalHelper = function(a, b, c, d) {
        z.registerHelper(a, b, d), ee[a]._global.push({
            pred: c,
            val: d
        })
    };
    var ef = z.copyState = function(a, b) {
            if (b === !0) return b;
            if (a.copyState) return a.copyState(b);
            var c = {};
            for (var d in b) {
                var e = b[d];
                e instanceof Array && (e = e.concat([])), c[d] = e
            }
            return c
        },
        eg = z.startState = function(a, b, c) {
            return a.startState ? a.startState(b, c) : !0
        };
    z.innerMode = function(a, b) {
        while (a.innerMode) {
            var c = a.innerMode(b);
            if (!c || c.mode == a) break;
            b = c.state, a = c.mode
        }
        return c || {
            mode: a,
            state: b
        }
    };
    var eh = z.commands = {
            selectAll: function(a) {
                a.setSelection(bm(a.firstLine(), 0), bm(a.lastLine()), gi)
            },
            singleSelection: function(a) {
                a.setSelection(a.getCursor("anchor"), a.getCursor("head"), gi)
            },
            killLine: function(a) {
                dU(a, function(b) {
                    if (b.empty()) {
                        var c = fv(a.doc, b.head.line).text.length;
                        return b.head.ch == c && b.head.line < a.lastLine() ? {
                            from: b.head,
                            to: bm(b.head.line + 1, 0)
                        } : {
                            from: b.head,
                            to: bm(b.head.line, c)
                        }
                    }
                    return {
                        from: b.from(),
                        to: b.to()
                    }
                })
            },
            deleteLine: function(a) {
                dU(a, function(b) {
                    return {
                        from: bm(b.from().line, 0),
                        to: bw(a.doc, bm(b.to().line + 1, 0))
                    }
                })
            },
            delLineLeft: function(a) {
                dU(a, function(a) {
                    return {
                        from: bm(a.from().line, 0),
                        to: a.from()
                    }
                })
            },
            undo: function(a) {
                a.undo()
            },
            redo: function(a) {
                a.redo()
            },
            undoSelection: function(a) {
                a.undoSelection()
            },
            redoSelection: function(a) {
                a.redoSelection()
            },
            goDocStart: function(a) {
                a.extendSelection(bm(a.firstLine(), 0))
            },
            goDocEnd: function(a) {
                a.extendSelection(bm(a.lastLine()))
            },
            goLineStart: function(a) {
                a.extendSelectionsBy(function(b) {
                    return gY(a, b.head.line)
                }, gk)
            },
            goLineStartSmart: function(a) {
                a.extendSelectionsBy(function(b) {
                    var c = gY(a, b.head.line),
                        d = a.getLineHandle(c.line),
                        e = fC(d);
                    if (!e || e[0].level == 0) {
                        var f = Math.max(0, d.text.search(/\S/)),
                            g = b.head.line == c.line && b.head.ch <= f && b.head.ch;
                        return bm(c.line, g ? 0 : f)
                    }
                    return c
                }, gk)
            },
            goLineEnd: function(a) {
                a.extendSelectionsBy(function(b) {
                    return gZ(a, b.head.line)
                }, gk)
            },
            goLineRight: function(a) {
                a.extendSelectionsBy(function(b) {
                    var c = a.charCoords(b.head, "div").top + 5;
                    return a.coordsChar({
                        left: a.display.lineDiv.offsetWidth + 100,
                        top: c
                    }, "div")
                }, gk)
            },
            goLineLeft: function(a) {
                a.extendSelectionsBy(function(b) {
                    var c = a.charCoords(b.head, "div").top + 5;
                    return a.coordsChar({
                        left: 0,
                        top: c
                    }, "div")
                }, gk)
            },
            goLineUp: function(a) {
                a.moveV(-1, "line")
            },
            goLineDown: function(a) {
                a.moveV(1, "line")
            },
            goPageUp: function(a) {
                a.moveV(-1, "page")
            },
            goPageDown: function(a) {
                a.moveV(1, "page")
            },
            goCharLeft: function(a) {
                a.moveH(-1, "char")
            },
            goCharRight: function(a) {
                a.moveH(1, "char")
            },
            goColumnLeft: function(a) {
                a.moveH(-1, "column")
            },
            goColumnRight: function(a) {
                a.moveH(1, "column")
            },
            goWordLeft: function(a) {
                a.moveH(-1, "word")
            },
            goGroupRight: function(a) {
                a.moveH(1, "group")
            },
            goGroupLeft: function(a) {
                a.moveH(-1, "group")
            },
            goWordRight: function(a) {
                a.moveH(1, "word")
            },
            delCharBefore: function(a) {
                a.deleteH(-1, "char")
            },
            delCharAfter: function(a) {
                a.deleteH(1, "char")
            },
            delWordBefore: function(a) {
                a.deleteH(-1, "word")
            },
            delWordAfter: function(a) {
                a.deleteH(1, "word")
            },
            delGroupBefore: function(a) {
                a.deleteH(-1, "group")
            },
            delGroupAfter: function(a) {
                a.deleteH(1, "group")
            },
            indentAuto: function(a) {
                a.indentSelection("smart")
            },
            indentMore: function(a) {
                a.indentSelection("add")
            },
            indentLess: function(a) {
                a.indentSelection("subtract")
            },
            insertTab: function(a) {
                a.replaceSelection("\t")
            },
            defaultTab: function(a) {
                a.somethingSelected() ? a.indentSelection("add") : a.execCommand("insertTab")
            },
            transposeChars: function(a) {
                cy(a, function() {
                    var b = a.listSelections();
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c].head,
                            e = fv(a.doc, d.line).text;
                        d.ch > 0 && d.ch < e.length - 1 && a.replaceRange(e.charAt(d.ch) + e.charAt(d.ch - 1), bm(d.line, d.ch - 1), bm(d.line, d.ch + 1))
                    }
                })
            },
            newlineAndIndent: function(a) {
                cy(a, function() {
                    var b = a.listSelections().length;
                    for (var c = 0; c < b; c++) {
                        var d = a.listSelections()[c];
                        a.replaceRange("\n", d.anchor, d.head, "+input"), a.indentLine(d.from().line + 1, null, !0), dQ(a)
                    }
                })
            },
            toggleOverwrite: function(a) {
                a.toggleOverwrite()
            }
        },
        ei = z.keyMap = {};
    ei.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    }, ei.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    }, ei.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delLineLeft",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        fallthrough: ["basic", "emacsy"]
    }, ei.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    }, ei["default"] = s ? ei.macDefault : ei.pcDefault;
    var ek = z.lookupKey = function(a, b, c) {
            function d(b) {
                b = ej(b);
                var e = b[a];
                if (e === !1) return "stop";
                if (e != null && c(e)) return !0;
                if (b.nofallthrough) return "stop";
                var f = b.fallthrough;
                if (f == null) return !1;
                if (Object.prototype.toString.call(f) != "[object Array]") return d(f);
                for (var g = 0; g < f.length; ++g) {
                    var h = d(f[g]);
                    if (h) return h
                }
                return !1
            }
            for (var e = 0; e < b.length; ++e) {
                var f = d(b[e]);
                if (f) return f != "stop"
            }
        },
        el = z.isModifierKey = function(a) {
            var b = gS[a.keyCode];
            return b == "Ctrl" || b == "Alt" || b == "Shift" || b == "Mod"
        },
        em = z.keyName = function(a, b) {
            if (k && a.keyCode == 34 && a["char"]) return !1;
            var c = gS[a.keyCode];
            if (c == null || a.altGraphKey) return !1;
            a.altKey && (c = "Alt-" + c);
            if (v ? a.metaKey : a.ctrlKey) c = "Ctrl-" + c;
            if (v ? a.ctrlKey : a.metaKey) c = "Cmd-" + c;
            return !b && a.shiftKey && (c = "Shift-" + c), c
        };
    z.fromTextArea = function(a, b) {
        function d() {
            a.value = i.getValue()
        }
        b || (b = {}), b.value = a.value, !b.tabindex && a.tabindex && (b.tabindex = a.tabindex), !b.placeholder && a.placeholder && (b.placeholder = a.placeholder);
        if (b.autofocus == null) {
            var c = gH();
            b.autofocus = c == a || a.getAttribute("autofocus") != null && c == document.body
        }
        if (a.form) {
            fY(a.form, "submit", d);
            if (!b.leaveSubmitMethodAlone) {
                var e = a.form,
                    f = e.submit;
                try {
                    var g = e.submit = function() {
                        d(), e.submit = f, e.submit(), e.submit = g
                    }
                } catch (h) {}
            }
        }
        a.style.display = "none";
        var i = z(function(b) {
            a.parentNode.insertBefore(b, a.nextSibling)
        }, b);
        return i.save = d, i.getTextArea = function() {
            return a
        }, i.toTextArea = function() {
            d(), a.parentNode.removeChild(i.getWrapperElement()), a.style.display = "", a.form && (fZ(a.form, "submit", d), typeof a.form.submit == "function" && (a.form.submit = f))
        }, i
    };
    var en = z.StringStream = function(a, b) {
        this.pos = this.start = 0, this.string = a, this.tabSize = b || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0
    };
    en.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return this.pos == this.lineStart
        },
        peek: function() {
            return this.string.charAt(this.pos) || undefined
        },
        next: function() {
            if (this.pos < this.string.length) return this.string.charAt(this.pos++)
        },
        eat: function(a) {
            var b = this.string.charAt(this.pos);
            if (typeof a == "string") var c = b == a;
            else var c = b && (a.test ? a.test(b) : a(b));
            if (c) return ++this.pos, b
        },
        eatWhile: function(a) {
            var b = this.pos;
            while (this.eat(a));
            return this.pos > b
        },
        eatSpace: function() {
            var a = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
            return this.pos > a
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(a) {
            var b = this.string.indexOf(a, this.pos);
            if (b > -1) return this.pos = b, !0
        },
        backUp: function(a) {
            this.pos -= a
        },
        column: function() {
            return this.lastColumnPos < this.start && (this.lastColumnValue = gm(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? gm(this.string, this.lineStart, this.tabSize) : 0)
        },
        indentation: function() {
            return gm(this.string, null, this.tabSize) - (this.lineStart ? gm(this.string, this.lineStart, this.tabSize) : 0)
        },
        match: function(a, b, c) {
            if (typeof a != "string") {
                var f = this.string.slice(this.pos).match(a);
                return f && f.index > 0 ? null : (f && b !== !1 && (this.pos += f[0].length), f)
            }
            var d = function(a) {
                    return c ? a.toLowerCase() : a
                },
                e = this.string.substr(this.pos, a.length);
            if (d(e) == d(a)) return b !== !1 && (this.pos += a.length), !0
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        },
        hideFirstChars: function(a, b) {
            this.lineStart += a;
            try {
                return b()
            } finally {
                this.lineStart -= a
            }
        }
    };
    var eo = z.TextMarker = function(a, b) {
        this.lines = [], this.type = b, this.doc = a
    };
    gf(eo), eo.prototype.clear = function() {
        if (this.explicitlyCleared) return;
        var a = this.doc.cm,
            b = a && !a.curOp;
        b && cw(a);
        if (ge(this, "clear")) {
            var c = this.find();
            c && gb(this, "clear", c.from, c.to)
        }
        var d = null,
            e = null;
        for (var f = 0; f < this.lines.length; ++f) {
            var g = this.lines[f],
                h = eu(g.markedSpans, this);
            a && !this.collapsed ? cF(a, fz(g), "text") : a && (h.to != null && (e = fz(g)), h.from != null && (d = fz(g))), g.markedSpans = ev(g.markedSpans, h), h.from == null && this.collapsed && !eQ(this.doc, g) && a && fy(g, ct(a.display))
        }
        if (a && this.collapsed && !a.options.lineWrapping)
            for (var f = 0; f < this.lines.length; ++f) {
                var i = eM(this.lines[f]),
                    j = K(i);
                j > a.display.maxLineLength && (a.display.maxLine = i, a.display.maxLineLength = j, a.display.maxLineChanged = !0)
            }
        d != null && a && this.collapsed && cE(a, d, e + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, a && bK(a.doc)), a && gb(a, "markerCleared", a, this), b && cx(a)
    }, eo.prototype.find = function(a, b) {
        a == null && this.type == "bookmark" && (a = 1);
        var c, d;
        for (var e = 0; e < this.lines.length; ++e) {
            var f = this.lines[e],
                g = eu(f.markedSpans, this);
            if (g.from != null) {
                c = bm(b ? f : fz(f), g.from);
                if (a == -1) return c
            }
            if (g.to != null) {
                d = bm(b ? f : fz(f), g.to);
                if (a == 1) return d
            }
        }
        return c && {
            from: c,
            to: d
        }
    }, eo.prototype.changed = function() {
        var a = this.find(-1, !0),
            b = this,
            c = this.doc.cm;
        if (!a || !c) return;
        cy(c, function() {
            var d = a.line,
                e = fz(a.line),
                f = ca(c, e);
            f && (cf(f), c.curOp.selectionChanged = c.curOp.forceUpdate = !0), c.curOp.updateMaxLine = !0;
            if (!eQ(b.doc, d) && b.height != null) {
                var g = b.height;
                b.height = null;
                var h = eU(b) - g;
                h && fy(d, d.height + h)
            }
        })
    }, eo.prototype.attachLine = function(a) {
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            (!b.maybeHiddenMarkers || gs(b.maybeHiddenMarkers, this) == -1) && (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(a)
    }, eo.prototype.detachLine = function(a) {
        this.lines.splice(gs(this.lines, a), 1);
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            (b.maybeHiddenMarkers || (b.maybeHiddenMarkers = [])).push(this)
        }
    };
    var ep = 0,
        er = z.SharedTextMarker = function(a, b) {
            this.markers = a, this.primary = b;
            for (var c = 0, d = this; c < a.length; ++c) a[c].parent = this, fY(a[c], "clear", function() {
                d.clear()
            })
        };
    gf(er), er.prototype.clear = function() {
        if (this.explicitlyCleared) return;
        this.explicitlyCleared = !0;
        for (var a = 0; a < this.markers.length; ++a) this.markers[a].clear();
        gb(this, "clear")
    }, er.prototype.find = function(a, b) {
        return this.primary.find(a, b)
    };
    var eS = z.LineWidget = function(a, b, c) {
        if (c)
            for (var d in c) c.hasOwnProperty(d) && (this[d] = c[d]);
        this.cm = a, this.node = b
    };
    gf(eS), eS.prototype.clear = function() {
        var a = this.cm,
            b = this.line.widgets,
            c = this.line,
            d = fz(c);
        if (d == null || !b) return;
        for (var e = 0; e < b.length; ++e) b[e] == this && b.splice(e--, 1);
        b.length || (c.widgets = null);
        var f = eU(this);
        cy(a, function() {
            eT(a, c, -f), cF(a, d, "widget"), fy(c, Math.max(0, c.height - f))
        })
    }, eS.prototype.changed = function() {
        var a = this.height,
            b = this.cm,
            c = this.line;
        this.height = null;
        var d = eU(this) - a;
        if (!d) return;
        cy(b, function() {
            b.curOp.forceUpdate = !0, eT(b, c, d), fy(c, c.height + d)
        })
    };
    var eW = z.Line = function(a, b, c) {
        this.text = a, eE(this, b), this.height = c ? c(this) : 1
    };
    gf(eW), eW.prototype.lineNo = function() {
        return fz(this)
    };
    var fb = {},
        fc = {};
    fn.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(a, b) {
            for (var c = a, d = a + b; c < d; ++c) {
                var e = this.lines[c];
                this.height -= e.height, eY(e), gb(e, "delete")
            }
            this.lines.splice(a, b)
        },
        collapse: function(a) {
            a.push.apply(a, this.lines)
        },
        insertInner: function(a, b, c) {
            this.height += c, this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
            for (var d = 0; d < b.length; ++d) b[d].parent = this
        },
        iterN: function(a, b, c) {
            for (var d = a + b; a < d; ++a)
                if (c(this.lines[a])) return !0
        }
    }, fo.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(a, b) {
            this.size -= b;
            for (var c = 0; c < this.children.length; ++c) {
                var d = this.children[c],
                    e = d.chunkSize();
                if (a < e) {
                    var f = Math.min(b, e - a),
                        g = d.height;
                    d.removeInner(a, f), this.height -= g - d.height, e == f && (this.children.splice(c--, 1), d.parent = null);
                    if ((b -= f) == 0) break;
                    a = 0
                } else a -= e
            }
            if (this.size - b < 25 && (this.children.length > 1 || !(this.children[0] instanceof fn))) {
                var h = [];
                this.collapse(h), this.children = [new fn(h)], this.children[0].parent = this
            }
        },
        collapse: function(a) {
            for (var b = 0; b < this.children.length; ++b) this.children[b].collapse(a)
        },
        insertInner: function(a, b, c) {
            this.size += b.length, this.height += c;
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d],
                    f = e.chunkSize();
                if (a <= f) {
                    e.insertInner(a, b, c);
                    if (e.lines && e.lines.length > 50) {
                        while (e.lines.length > 50) {
                            var g = e.lines.splice(e.lines.length - 25, 25),
                                h = new fn(g);
                            e.height -= h.height, this.children.splice(d + 1, 0, h), h.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                a -= f
            }
        },
        maybeSpill: function() {
            if (this.children.length <= 10) return;
            var a = this;
            do {
                var b = a.children.splice(a.children.length - 5, 5),
                    c = new fo(b);
                if (!a.parent) {
                    var d = new fo(a.children);
                    d.parent = a, a.children = [d, c], a = d
                } else {
                    a.size -= c.size, a.height -= c.height;
                    var e = gs(a.parent.children, a);
                    a.parent.children.splice(e + 1, 0, c)
                }
                c.parent = a.parent
            } while (a.children.length > 10);
            a.parent.maybeSpill()
        },
        iterN: function(a, b, c) {
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d],
                    f = e.chunkSize();
                if (a < f) {
                    var g = Math.min(b, f - a);
                    if (e.iterN(a, g, c)) return !0;
                    if ((b -= g) == 0) break;
                    a = 0
                } else a -= f
            }
        }
    };
    var fp = 0,
        fq = z.Doc = function(a, b, c) {
            if (!(this instanceof fq)) return new fq(a, b, c);
            c == null && (c = 0), fo.call(this, [new fn([new eW("", null)])]), this.first = c, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = c;
            var d = bm(c, 0);
            this.sel = bu(d), this.history = new fD(null), this.id = ++fp, this.modeOption = b, typeof a == "string" && (a = gP(a)), fm(this, {
                from: d,
                to: d,
                text: a
            }), bH(this, bu(d), gi)
        };
    fq.prototype = gu(fo.prototype, {
        constructor: fq,
        iter: function(a, b, c) {
            c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a)
        },
        insert: function(a, b) {
            var c = 0;
            for (var d = 0; d < b.length; ++d) c += b[d].height;
            this.insertInner(a - this.first, b, c)
        },
        remove: function(a, b) {
            this.removeInner(a - this.first, b)
        },
        getValue: function(a) {
            var b = fx(this, this.first, this.first + this.size);
            return a === !1 ? b : b.join(a || "\n")
        },
        setValue: cB(function(a) {
            var b = bm(this.first, 0),
                c = this.first + this.size - 1;
            dE(this, {
                from: b,
                to: bm(c, fv(this, c).text.length),
                text: gP(a),
                origin: "setValue"
            }, !0), bH(this, bu(b))
        }),
        replaceRange: function(a, b, c, d) {
            b = bw(this, b), c = c ? bw(this, c) : b, dK(this, a, b, c, d)
        },
        getRange: function(a, b, c) {
            var d = fw(this, bw(this, a), bw(this, b));
            return c === !1 ? d : d.join(c || "\n")
        },
        getLine: function(a) {
            var b = this.getLineHandle(a);
            return b && b.text
        },
        getLineHandle: function(a) {
            if (by(this, a)) return fv(this, a)
        },
        getLineNumber: function(a) {
            return fz(a)
        },
        getLineHandleVisualStart: function(a) {
            return typeof a == "number" && (a = fv(this, a)), eM(a)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(a) {
            return bw(this, a)
        },
        getCursor: function(a) {
            var b = this.sel.primary(),
                c;
            return a == null || a == "head" ? c = b.head : a == "anchor" ? c = b.anchor : a == "end" || a == "to" || a === !1 ? c = b.to() : c = b.from(), c
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: cB(function(a, b, c) {
            bE(this, bw(this, typeof a == "number" ? bm(a, b || 0) : a), null, c)
        }),
        setSelection: cB(function(a, b, c) {
            bE(this, bw(this, a), bw(this, b || a), c)
        }),
        extendSelection: cB(function(a, b, c) {
            bB(this, bw(this, a), b && bw(this, b), c)
        }),
        extendSelections: cB(function(a, b) {
            bC(this, bz(this, a, b))
        }),
        extendSelectionsBy: cB(function(a, b) {
            bC(this, gt(this.sel.ranges, a), b)
        }),
        setSelections: cB(function(a, b, c) {
            if (!a.length) return;
            for (var d = 0, e = []; d < a.length; d++) e[d] = new bs(bw(this, a[d].anchor), bw(this, a[d].head));
            b == null && (b = Math.min(a.length - 1, this.sel.primIndex)), bH(this, bt(e, b), c)
        }),
        addSelection: cB(function(a, b, c) {
            var d = this.sel.ranges.slice(0);
            d.push(new bs(bw(this, a), bw(this, b || a))), bH(this, bt(d, d.length - 1), c)
        }),
        getSelection: function(a) {
            var b = this.sel.ranges,
                c;
            for (var d = 0; d < b.length; d++) {
                var e = fw(this, b[d].from(), b[d].to());
                c = c ? c.concat(e) : e
            }
            return a === !1 ? c : c.join(a || "\n")
        },
        getSelections: function(a) {
            var b = [],
                c = this.sel.ranges;
            for (var d = 0; d < c.length; d++) {
                var e = fw(this, c[d].from(), c[d].to());
                a !== !1 && (e = e.join(a || "\n")), b[d] = e
            }
            return b
        },
        replaceSelection: cB(function(a, b, c) {
            var d = [];
            for (var e = 0; e < this.sel.ranges.length; e++) d[e] = a;
            this.replaceSelections(d, b, c || "+input")
        }),
        replaceSelections: function(a, b, c) {
            var d = [],
                e = this.sel;
            for (var f = 0; f < e.ranges.length; f++) {
                var g = e.ranges[f];
                d[f] = {
                    from: g.from(),
                    to: g.to(),
                    text: gP(a[f]),
                    origin: c
                }
            }
            var h = b && b != "end" && dC(this, d, b);
            for (var f = d.length - 1; f >= 0; f--) dE(this, d[f]);
            h ? bG(this, h) : this.cm && dQ(this.cm)
        },
        undo: cB(function() {
            dG(this, "undo")
        }),
        redo: cB(function() {
            dG(this, "redo")
        }),
        undoSelection: cB(function() {
            dG(this, "undo", !0)
        }),
        redoSelection: cB(function() {
            dG(this, "redo", !0)
        }),
        setExtending: function(a) {
            this.extend = a
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            var a = this.history,
                b = 0,
                c = 0;
            for (var d = 0; d < a.done.length; d++) a.done[d].ranges || ++b;
            for (var d = 0; d < a.undone.length; d++) a.undone[d].ranges || ++c;
            return {
                undo: b,
                redo: c
            }
        },
        clearHistory: function() {
            this.history = new fD(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function(a) {
            return a && (this.history.lastOp = this.history.lastOrigin = null), this.history.generation
        },
        isClean: function(a) {
            return this.history.generation == (a || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: fO(this.history.done),
                undone: fO(this.history.undone)
            }
        },
        setHistory: function(a) {
            var b = this.history = new fD(this.history.maxGeneration);
            b.done = fO(a.done.slice(0), null, !0), b.undone = fO(a.undone.slice(0), null, !0)
        },
        markText: function(a, b, c) {
            return eq(this, bw(this, a), bw(this, b), c, "range")
        },
        setBookmark: function(a, b) {
            var c = {
                replacedWith: b && (b.nodeType == null ? b.widget : b),
                insertLeft: b && b.insertLeft,
                clearWhenEmpty: !1,
                shared: b && b.shared
            };
            return a = bw(this, a), eq(this, a, a, c, "bookmark")
        },
        findMarksAt: function(a) {
            a = bw(this, a);
            var b = [],
                c = fv(this, a.line).markedSpans;
            if (c)
                for (var d = 0; d < c.length; ++d) {
                    var e = c[d];
                    (e.from == null || e.from <= a.ch) && (e.to == null || e.to >= a.ch) && b.push(e.marker.parent || e.marker)
                }
            return b
        },
        findMarks: function(a, b) {
            a = bw(this, a), b = bw(this, b);
            var c = [],
                d = a.line;
            return this.iter(a.line, b.line + 1, function(e) {
                var f = e.markedSpans;
                if (f)
                    for (var g = 0; g < f.length; g++) {
                        var h = f[g];
                        d == a.line && a.ch > h.to || h.from == null && d != a.line || d == b.line && h.from > b.ch || c.push(h.marker.parent || h.marker)
                    }++d
            }), c
        },
        getAllMarks: function() {
            var a = [];
            return this.iter(function(b) {
                var c = b.markedSpans;
                if (c)
                    for (var d = 0; d < c.length; ++d) c[d].from != null && a.push(c[d].marker)
            }), a
        },
        posFromIndex: function(a) {
            var b, c = this.first;
            return this.iter(function(d) {
                var e = d.text.length + 1;
                if (e > a) return b = a, !0;
                a -= e, ++c
            }), bw(this, bm(c, b))
        },
        indexFromPos: function(a) {
            a = bw(this, a);
            var b = a.ch;
            return a.line < this.first || a.ch < 0 ? 0 : (this.iter(this.first, a.line, function(a) {
                b += a.text.length + 1
            }), b)
        },
        copy: function(a) {
            var b = new fq(fx(this, this.first, this.first + this.size), this.modeOption, this.first);
            return b.scrollTop = this.scrollTop, b.scrollLeft = this.scrollLeft, b.sel = this.sel, b.extend = !1, a && (b.history.undoDepth = this.history.undoDepth, b.setHistory(this.getHistory())), b
        },
        linkedDoc: function(a) {
            a || (a = {});
            var b = this.first,
                c = this.first + this.size;
            a.from != null && a.from > b && (b = a.from), a.to != null && a.to < c && (c = a.to);
            var d = new fq(fx(this, b, c), a.mode || this.modeOption, b);
            return a.sharedHist && (d.history = this.history), (this.linked || (this.linked = [])).push({
                doc: d,
                sharedHist: a.sharedHist
            }), d.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: a.sharedHist
            }], d
        },
        unlinkDoc: function(a) {
            a instanceof z && (a = a.doc);
            if (this.linked)
                for (var b = 0; b < this.linked.length; ++b) {
                    var c = this.linked[b];
                    if (c.doc != a) continue;
                    this.linked.splice(b, 1), a.unlinkDoc(this);
                    break
                }
            if (a.history == this.history) {
                var d = [a.id];
                ft(a, function(a) {
                    d.push(a.id)
                }, !0), a.history = new fD(null), a.history.done = fO(this.history.done, d), a.history.undone = fO(this.history.undone, d)
            }
        },
        iterLinkedDocs: function(a) {
            ft(this, a)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        }
    }), fq.prototype.eachLine = fq.prototype.iter;
    var fr = "iter insert remove copy getEditor".split(" ");
    for (var fs in fq.prototype) fq.prototype.hasOwnProperty(fs) && gs(fr, fs) < 0 && (z.prototype[fs] = function(a) {
        return function() {
            return a.apply(this.doc, arguments)
        }
    }(fq.prototype[fs]));
    gf(fq);
    var fS = z.e_preventDefault = function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        fT = z.e_stopPropagation = function(a) {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        },
        fV = z.e_stop = function(a) {
            fS(a), fT(a)
        },
        fY = z.on = function(a, b, c) {
            if (a.addEventListener) a.addEventListener(b, c, !1);
            else if (a.attachEvent) a.attachEvent("on" + b, c);
            else {
                var d = a._handlers || (a._handlers = {}),
                    e = d[b] || (d[b] = []);
                e.push(c)
            }
        },
        fZ = z.off = function(a, b, c) {
            if (a.removeEventListener) a.removeEventListener(b, c, !1);
            else if (a.detachEvent) a.detachEvent("on" + b, c);
            else {
                var d = a._handlers && a._handlers[b];
                if (!d) return;
                for (var e = 0; e < d.length; ++e)
                    if (d[e] == c) {
                        d.splice(e, 1);
                        break
                    }
            }
        },
        f$ = z.signal = function(a, b) {
            var c = a._handlers && a._handlers[b];
            if (!c) return;
            var d = Array.prototype.slice.call(arguments, 2);
            for (var e = 0; e < c.length; ++e) c[e].apply(null, d)
        },
        f_, ga = 0,
        gg = 30,
        gh = z.Pass = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        },
        gi = {
            scroll: !1
        },
        gj = {
            origin: "*mouse"
        },
        gk = {
            origin: "+move"
        };
    gl.prototype.set = function(a, b) {
        clearTimeout(this.id), this.id = setTimeout(b, a)
    };
    var gm = z.countColumn = function(a, b, c, d, e) {
            b == null && (b = a.search(/[^\s\u00a0]/), b == -1 && (b = a.length));
            for (var f = d || 0, g = e || 0;;) {
                var h = a.indexOf("\t", f);
                if (h < 0 || h >= b) return g + (b - f);
                g += h - f, g += c - g % c, f = h + 1
            }
        },
        go = [""],
        gr = function(a) {
            a.select()
        };
    q ? gr = function(a) {
        a.selectionStart = 0, a.selectionEnd = a.value.length
    } : g && (gr = function(a) {
        try {
            a.select()
        } catch (b) {}
    }), [].indexOf && (gs = function(a, b) {
        return a.indexOf(b)
    }), [].map && (gt = function(a, b) {
        return a.map(b)
    });
    var gx = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        gy = z.isWordChar = function(a) {
            return /\w/.test(a) || a > "Â€" && (a.toUpperCase() != a.toLowerCase() || gx.test(a))
        },
        gA = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
        gD;
    document.createRange ? gD = function(a, b, c) {
        var d = document.createRange();
        return d.setEnd(a, c), d.setStart(a, b), d
    } : gD = function(a, b, c) {
        var d = document.body.createTextRange();
        return d.moveToElementText(a.parentNode), d.collapse(!0), d.moveEnd("character", c), d.moveStart("character", b), d
    }, b && (gH = function() {
        try {
            return document.activeElement
        } catch (a) {
            return document.body
        }
    });
    var gI = function() {
            if (d) return !1;
            var a = gC("div");
            return "draggable" in a || "dragDrop" in a
        }(),
        gJ, gL, gN, gP = z.splitLines = "\n\nb".split(/\n/).length != 3 ? function(a) {
            var b = 0,
                c = [],
                d = a.length;
            while (b <= d) {
                var e = a.indexOf("\n", b);
                e == -1 && (e = a.length);
                var f = a.slice(b, a.charAt(e - 1) == "\r" ? e - 1 : e),
                    g = f.indexOf("\r");
                g != -1 ? (c.push(f.slice(0, g)), b += g + 1) : (c.push(f), b = e + 1)
            }
            return c
        } : function(a) {
            return a.split(/\r\n?|\n/)
        },
        gQ = window.getSelection ? function(a) {
            try {
                return a.selectionStart != a.selectionEnd
            } catch (b) {
                return !1
            }
        } : function(a) {
            try {
                var b = a.ownerDocument.selection.createRange()
            } catch (c) {}
            return !b || b.parentElement() != a ? !1 : b.compareEndPoints("StartToEnd", b) != 0
        },
        gR = function() {
            var a = gC("div");
            return "oncopy" in a ? !0 : (a.setAttribute("oncopy", "return;"), typeof a.oncopy == "function")
        }(),
        gS = {
            3: "Enter",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            107: "=",
            109: "-",
            127: "Delete",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63232: "Up",
            63233: "Down",
            63234: "Left",
            63235: "Right",
            63272: "Delete",
            63273: "Home",
            63275: "End",
            63276: "PageUp",
            63277: "PageDown",
            63302: "Insert"
        };
    z.keyNames = gS,
        function() {
            for (var a = 0; a < 10; a++) gS[a + 48] = gS[a + 96] = String(a);
            for (var a = 65; a <= 90; a++) gS[a] = String.fromCharCode(a);
            for (var a = 1; a <= 12; a++) gS[a + 111] = gS[a + 63235] = "F" + a
        }();
    var g_, he = function() {
        function c(c) {
            return c <= 247 ? a.charAt(c) : 1424 <= c && c <= 1524 ? "R" : 1536 <= c && c <= 1773 ? b.charAt(c - 1536) : 1774 <= c && c <= 2220 ? "r" : 8192 <= c && c <= 8203 ? "w" : c == 8204 ? "b" : "L"
        }

        function j(a, b, c) {
            this.level = a, this.from = b, this.to = c
        }
        var a = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
            b = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
            d = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            e = /[stwN]/,
            f = /[LRr]/,
            g = /[Lb1n]/,
            h = /[1n]/,
            i = "L";
        return function(a) {
            if (!d.test(a)) return !1;
            var b = a.length,
                k = [];
            for (var l = 0, m; l < b; ++l) k.push(m = c(a.charCodeAt(l)));
            for (var l = 0, n = i; l < b; ++l) {
                var m = k[l];
                m == "m" ? k[l] = n : n = m
            }
            for (var l = 0, o = i; l < b; ++l) {
                var m = k[l];
                m == "1" && o == "r" ? k[l] = "n" : f.test(m) && (o = m, m == "r" && (k[l] = "R"))
            }
            for (var l = 1, n = k[0]; l < b - 1; ++l) {
                var m = k[l];
                m == "+" && n == "1" && k[l + 1] == "1" ? k[l] = "1" : m == "," && n == k[l + 1] && (n == "1" || n == "n") && (k[l] = n), n = m
            }
            for (var l = 0; l < b; ++l) {
                var m = k[l];
                if (m == ",") k[l] = "N";
                else if (m == "%") {
                    for (var p = l + 1; p < b && k[p] == "%"; ++p);
                    var q = l && k[l - 1] == "!" || p < b && k[p] == "1" ? "1" : "N";
                    for (var r = l; r < p; ++r) k[r] = q;
                    l = p - 1
                }
            }
            for (var l = 0, o = i; l < b; ++l) {
                var m = k[l];
                o == "L" && m == "1" ? k[l] = "L" : f.test(m) && (o = m)
            }
            for (var l = 0; l < b; ++l)
                if (e.test(k[l])) {
                    for (var p = l + 1; p < b && e.test(k[p]); ++p);
                    var s = (l ? k[l - 1] : i) == "L",
                        t = (p < b ? k[p] : i) == "L",
                        q = s || t ? "L" : "R";
                    for (var r = l; r < p; ++r) k[r] = q;
                    l = p - 1
                }
            var u = [],
                v;
            for (var l = 0; l < b;)
                if (g.test(k[l])) {
                    var w = l;
                    for (++l; l < b && g.test(k[l]); ++l);
                    u.push(new j(0, w, l))
                } else {
                    var x = l,
                        y = u.length;
                    for (++l; l < b && k[l] != "L"; ++l);
                    for (var r = x; r < l;)
                        if (h.test(k[r])) {
                            x < r && u.splice(y, 0, new j(1, x, r));
                            var z = r;
                            for (++r; r < l && h.test(k[r]); ++r);
                            u.splice(y, 0, new j(2, z, r)), x = r
                        } else ++r;
                    x < l && u.splice(y, 0, new j(1, x, l))
                }
            return u[0].level == 1 && (v = a.match(/^\s+/)) && (u[0].from = v[0].length, u.unshift(new j(0, 0, v[0].length))), gq(u).level == 1 && (v = a.match(/\s+$/)) && (gq(u).to -= v[0].length, u.push(new j(0, b - v[0].length, b))), u[0].level != gq(u).level && u.push(new j(u[0].level, b, b)), u
        }
    }();
    return z.version = "4.0.3", z
});

colorPalettesAliases = {
    1: "mastersystem",
    2: "gameboycolour",
    3: "amiga",
    4: "arnecolors",
    5: "famicom",
    6: "atari",
    7: "pastel",
    8: "ega",
    9: "amstrad",
    10: "proteus_mellow",
    11: "proteus_rich",
    12: "proteus_night",
    13: "c64",
    14: "whitingjp"
}, colorPalettes = {
    mastersystem: {
        black: "#000000",
        white: "#FFFFFF",
        grey: "#555555",
        darkgrey: "#555500",
        lightgrey: "#AAAAAA",
        gray: "#555555",
        darkgray: "#555500",
        lightgray: "#AAAAAA",
        red: "#FF0000",
        darkred: "#AA0000",
        lightred: "#FF5555",
        brown: "#AA5500",
        darkbrown: "#550000",
        lightbrown: "#FFAA00",
        orange: "#FF5500",
        yellow: "#FFFF55",
        green: "#55AA00",
        darkgreen: "#005500",
        lightgreen: "#AAFF00",
        blue: "#5555AA",
        lightblue: "#AAFFFF",
        darkblue: "#000055",
        purple: "#550055",
        pink: "#FFAAFF"
    },
    gameboycolour: {
        black: "#000000",
        white: "#FFFFFF",
        grey: "#7F7F7C",
        darkgrey: "#3E3E44",
        lightgrey: "#BAA7A7",
        gray: "#7F7F7C",
        darkgray: "#3E3E44",
        lightgray: "#BAA7A7",
        red: "#A7120C",
        darkred: "#880606",
        lightred: "#BA381F",
        brown: "#57381F",
        darkbrown: "#3E2519",
        lightbrown: "#8E634B",
        orange: "#BA4B32",
        yellow: "#C0BA6F",
        green: "#517525",
        darkgreen: "#385D12",
        lightgreen: "#6F8E44",
        blue: "#5D6FA7",
        lightblue: "#8EA7A7",
        darkblue: "#4B575D",
        purple: "#3E3E44",
        pink: "#BA381F"
    },
    amiga: {
        black: "#000000",
        white: "#FFFFFF",
        grey: "#BBBBBB",
        darkgrey: "#333333",
        lightgrey: "#FFEEDD",
        gray: "#BBBBBB",
        darkgray: "#333333",
        lightgray: "#FFEEDD",
        red: "#DD1111",
        darkred: "#990000",
        lightred: "#FF4422",
        brown: "#663311",
        darkbrown: "#331100",
        lightbrown: "#AA6644",
        orange: "#FF6644",
        yellow: "#FFDD66",
        green: "#448811",
        darkgreen: "#335500",
        lightgreen: "#88BB77",
        blue: "#8899DD",
        lightblue: "#BBDDEE",
        darkblue: "#666688",
        purple: "#665555",
        pink: "#997788"
    },
    arnecolors: {
        black: "#000000",
        white: "#FFFFFF",
        grey: "#9d9d9d",
        darkgrey: "#697175",
        lightgrey: "#cccccc",
        gray: "#9d9d9d",
        darkgray: "#697175",
        lightgray: "#cccccc",
        red: "#be2633",
        darkred: "#732930",
        lightred: "#e06f8b",
        brown: "#a46422",
        darkbrown: "#493c2b",
        lightbrown: "#eeb62f",
        orange: "#eb8931",
        yellow: "#f7e26b",
        green: "#44891a",
        darkgreen: "#2f484e",
        lightgreen: "#a3ce27",
        blue: "#1d57f7",
        lightblue: "#B2DCEF",
        darkblue: "#1B2632",
        purple: "#342a97",
        pink: "#de65e2"
    },
    famicom: {
        black: "#000000",
        white: "#ffffff",
        grey: "#7c7c7c",
        darkgrey: "#080808",
        lightgrey: "#bcbcbc",
        gray: "#7c7c7c",
        darkgray: "#080808",
        lightgray: "#bcbcbc",
        red: "#f83800",
        darkred: "#881400",
        lightred: "#f87858",
        brown: "#AC7C00",
        darkbrown: "#503000",
        lightbrown: "#FCE0A8",
        orange: "#FCA044",
        yellow: "#F8B800",
        green: "#00B800",
        darkgreen: "#005800",
        lightgreen: "#B8F8B8",
        blue: "#0058F8",
        lightblue: "#3CBCFC",
        darkblue: "#0000BC",
        purple: "#6644FC",
        pink: "#F878F8"
    },
    atari: {
        black: "#000000",
        white: "#FFFFFF",
        grey: "#909090",
        darkgrey: "#404040",
        lightgrey: "#b0b0b0",
        gray: "#909090",
        darkgray: "#404040",
        lightgray: "#b0b0b0",
        red: "#A03C50",
        darkred: "#700014",
        lightred: "#DC849C",
        brown: "#805020",
        darkbrown: "#703400",
        lightbrown: "#CB9870",
        orange: "#CCAC70",
        yellow: "#ECD09C",
        green: "#58B06C",
        darkgreen: "#006414",
        lightgreen: "#70C484",
        blue: "#1C3C88",
        lightblue: "#6888C8",
        darkblue: "#000088",
        purple: "#3C0080",
        pink: "#B484DC"
    },
    pastel: {
        black: "#000000",
        white: "#FFFFFF",
        grey: "#3e3e3e",
        darkgrey: "#313131",
        lightgrey: "#9cbcbc",
        gray: "#3e3e3e",
        darkgray: "#313131",
        lightgray: "#9cbcbc",
        red: "#f56ca2",
        darkred: "#a63577",
        lightred: "#ffa9cf",
        brown: "#b58c53",
        darkbrown: "#787562",
        lightbrown: "#B58C53",
        orange: "#EB792D",
        yellow: "#FFe15F",
        green: "#00FF4F",
        darkgreen: "#2b732c",
        lightgreen: "#97c04f",
        blue: "#0f88d3",
        lightblue: "#00fffe",
        darkblue: "#293a7b",
        purple: "#ff6554",
        pink: "#eb792d"
    },
    ega: {
        black: "#000000",
        white: "#ffffff",
        grey: "#555555",
        darkgrey: "#555555",
        lightgrey: "#aaaaaa",
        gray: "#555555",
        darkgray: "#555555",
        lightgray: "#aaaaaa",
        red: "#ff5555",
        darkred: "#aa0000",
        lightred: "#ff55ff",
        brown: "#aa5500",
        darkbrown: "#aa5500",
        lightbrown: "#ffff55",
        orange: "#ff5555",
        yellow: "#ffff55",
        green: "#00aa00",
        darkgreen: "#00aaaa",
        lightgreen: "#55ff55",
        blue: "#5555ff",
        lightblue: "#55ffff",
        darkblue: "#0000aa",
        purple: "#aa00aa",
        pink: "#ff55ff"
    },
    proteus_mellow: {
        black: "#3d2d2e",
        white: "#ddf1fc",
        grey: "#9fb2d4",
        darkgrey: "#7b8272",
        lightgrey: "#a4bfda",
        gray: "#9fb2d4",
        darkgray: "#7b8272",
        lightgray: "#a4bfda",
        red: "#9d5443",
        darkred: "#8c5b4a",
        lightred: "#94614c",
        brown: "#89a78d",
        darkbrown: "#829e88",
        lightbrown: "#aaae97",
        orange: "#d1ba86",
        yellow: "#d6cda2",
        green: "#75ac8d",
        darkgreen: "#8fa67f",
        lightgreen: "#8eb682",
        blue: "#88a3ce",
        lightblue: "#a5adb0",
        darkblue: "#5c6b8c",
        purple: "#d39fac",
        pink: "#c8ac9e"
    },
    proteus_night: {
        black: "#010912",
        white: "#fdeeec",
        grey: "#051d40",
        darkgrey: "#091842",
        lightgrey: "#062151",
        gray: "#051d40",
        darkgray: "#091842",
        lightgray: "#062151",
        red: "#ad4576",
        darkred: "#934765",
        lightred: "#ab6290",
        brown: "#61646b",
        darkbrown: "#3d2d2d",
        lightbrown: "#8393a0",
        orange: "#0a2227",
        yellow: "#0a2541",
        green: "#75ac8d",
        darkgreen: "#0a2434",
        lightgreen: "#061f2e",
        blue: "#0b2c79",
        lightblue: "#809ccb",
        darkblue: "#08153b",
        purple: "#666a87",
        pink: "#754b4d"
    },
    proteus_rich: {
        black: "#6f686f",
        white: "#d1b1e2",
        grey: "#b9aac1",
        darkgrey: "#8e8b84",
        lightgrey: "#c7b5cd",
        gray: "#b9aac1",
        darkgray: "#8e8b84",
        lightgray: "#c7b5cd",
        red: "#a11f4f",
        darkred: "#934765",
        lightred: "#c998ad",
        brown: "#89867d",
        darkbrown: "#797f75",
        lightbrown: "#ab9997",
        orange: "#ce8c5c",
        yellow: "#f0d959",
        green: "#75bc54",
        darkgreen: "#599d79",
        lightgreen: "#90cf5c",
        blue: "#8fd0ec",
        lightblue: "#bcdce7",
        darkblue: "#0b2c70",
        purple: "#9b377f",
        pink: "#cd88e5"
    },
    amstrad: {
        black: "#000000",
        white: "#ffffff",
        grey: "#7f7f7f",
        darkgrey: "#636363",
        lightgrey: "#afafaf",
        gray: "#7f7f7f",
        darkgray: "#636363",
        lightgray: "#afafaf",
        red: "#ff0000",
        darkred: "#7f0000",
        lightred: "#ff7f7f",
        brown: "#ff7f00",
        darkbrown: "#7f7f00",
        lightbrown: "#ffff00",
        orange: "#ff007f",
        yellow: "#ffff7f",
        green: "#01ff00",
        darkgreen: "#007f00",
        lightgreen: "#7fff7f",
        blue: "#0000ff",
        lightblue: "#7f7fff",
        darkblue: "#00007f",
        purple: "#7f007f",
        pink: "#ff7fff"
    },
    c64: {
        black: "#000000",
        white: "#ffffff",
        grey: "#6C6C6C",
        darkgrey: "#444444",
        lightgrey: "#959595",
        gray: "#6C6C6C",
        darkgray: "#444444",
        lightgray: "#959595",
        red: "#68372B",
        darkred: "#3f1e17",
        lightred: "#9A6759",
        brown: "#433900",
        darkbrown: "#221c02",
        lightbrown: "#6d5c0d",
        orange: "#6F4F25",
        yellow: "#B8C76F",
        green: "#588D43",
        darkgreen: "#345129",
        lightgreen: "#9AD284",
        blue: "#6C5EB5",
        lightblue: "#70A4B2",
        darkblue: "#352879",
        purple: "#6F3D86",
        pink: "#b044ac"
    },
    whitingjp: {
        black: "#202527",
        white: "#eff8fd",
        grey: "#7b7680",
        darkgrey: "#3c3b44",
        lightgrey: "#bed0d7",
        gray: "#7b7680",
        darkgray: "#3c3b44",
        lightgray: "#bed0d7",
        red: "#bd194b",
        darkred: "#6b1334",
        lightred: "#ef2358",
        brown: "#b52e1c",
        darkbrown: "#681c12",
        lightbrown: "#e87b45",
        orange: "#ff8c10",
        yellow: "#fbd524",
        green: "#36bc3c",
        darkgreen: "#317610",
        lightgreen: "#8ce062",
        blue: "#3f62c6",
        lightblue: "#57bbe0",
        darkblue: "#2c2fa0",
        purple: "#7037d9",
        pink: "#ec2b8f"
    }
};
var reg_color_names = /(black|white|darkgray|lightgray|gray|grey|darkgrey|lightgrey|red|darkred|lightred|brown|darkbrown|lightbrown|orange|yellow|green|darkgreen|lightgreen|blue|lightblue|darkblue|purple|pink|transparent)\s*/,
    reg_color = /(black|white|gray|darkgray|lightgray|grey|darkgrey|lightgrey|red|darkred|lightred|brown|darkbrown|lightbrown|orange|yellow|green|darkgreen|lightgreen|blue|lightblue|darkblue|purple|pink|transparent|#(?:[0-9a-f]{3}){1,2})\s*/;

function createSprite(a, b, c, d) {
    c === undefined && (c = [state.bgcolor, state.fgcolor]);
    var e = makeSpriteCanvas(a),
        f = e.getContext("2d");
    f.clearRect(0, 0, cellwidth, cellheight);
    var g = b[0].length,
        h = b.length,
        i = ~~(cellwidth / (g + (d | 0))),
        j = ~~(cellheight / (h + (d | 0))),
        k = j;
    "scanline" in state.metadata && (k = Math.ceil(j / 2)), f.fillStyle = state.fgcolor;
    for (var l = 0; l < g; l++)
        for (var m = 0; m < h; m++) {
            var n = b[l][m];
            if (n >= 0) {
                var o = l * i | 0,
                    p = m * j | 0;
                f.fillStyle = c[n], f.fillRect(p, o, i, k)
            }
        }
    return e
}

function regenText(a, b) {
    textImages = {};
    for (var c in font) font.hasOwnProperty(c) && (textImages[c] = createSprite("char" + c, font[c], undefined, 1))
}

function regenSpriteImages() {
    if (textMode) {
        regenText();
        return
    }
    levelEditorOpened && (textImages.s = createSprite("chars", font.s, undefined));
    if (state.levels.length === 0) return;
    spriteimages = [];
    for (var a = 0; a < sprites.length; a++) {
        if (sprites[a] == undefined) continue;
        spriteimages[a] = createSprite(a.toString(), sprites[a].dat, sprites[a].colors)
    }
    canOpenEditor && generateGlyphImages()
}

function makeSpriteCanvas(a) {
    var b;
    return a in canvasdict ? b = canvasdict[a] : (b = document.createElement("canvas"), canvasdict[a] = b), b.width = cellwidth, b.height = cellheight, b
}

function generateGlyphImages() {
    if (cellwidth === 0 || cellheight === 0) return;
    glyphImagesCorrespondance = [], glyphImages = [];
    for (var a in state.glyphDict)
        if (a.length == 1 && state.glyphDict.hasOwnProperty(a)) {
            var b = state.glyphDict[a],
                c = makeSpriteCanvas("C" + a),
                d = c.getContext("2d");
            glyphImagesCorrespondance.push(a);
            for (var e = 0; e < b.length; e++) {
                var f = b[e];
                if (f === -1) continue;
                d.drawImage(spriteimages[f], 0, 0)
            }
            glyphImages.push(c)
        }
    glyphHighlight = makeSpriteCanvas("highlight");
    var d = glyphHighlight.getContext("2d");
    d.fillStyle = "#FFFFFF", d.fillRect(0, 0, cellwidth, 1), d.fillRect(0, 0, 1, cellheight), d.fillRect(0, cellheight - 1, cellwidth, 1), d.fillRect(cellwidth - 1, 0, 1, cellheight), glyphPrintButton = textImages.s, glyphHighlightResize = makeSpriteCanvas("highlightresize");
    var d = glyphHighlightResize.getContext("2d");
    d.fillStyle = "#FFFFFF";
    var g = cellwidth / 2 - 1 | 0,
        h = cellwidth - g - 1 - g,
        i = cellheight / 2 - 1 | 0,
        j = cellheight - i - 1 - g;
    d.fillRect(g, 0, h, cellheight), d.fillRect(0, i, cellwidth, j), glyphMouseOver = makeSpriteCanvas();
    var d = glyphMouseOver.getContext("2d");
    d.fillStyle = "yellow", d.fillRect(0, 0, cellwidth, 2), d.fillRect(0, 0, 2, cellheight), d.fillRect(0, cellheight - 2, cellwidth, 2), d.fillRect(cellwidth - 2, 0, 2, cellheight)
}

function glyphCount() {
    var a = 0;
    for (var b in state.glyphDict) b.length == 1 && state.glyphDict.hasOwnProperty(b) && a++;
    return a
}

function redraw() {
    if (cellwidth === 0 || cellheight === 0) return;
    spriteimages === undefined && regenSpriteImages();
    if (textMode) {
        ctx.fillStyle = state.bgcolor, ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var a = 0; a < titleWidth; a++)
            for (var b = 0; b < titleHeight; b++) {
                var c = titleImage[b].charAt(a);
                if (c in textImages) {
                    var d = textImages[c];
                    ctx.drawImage(d, xoffset + a * cellwidth, yoffset + b * cellheight)
                }
            }
        return
    }
    ctx.fillStyle = state.bgcolor, ctx.fillRect(0, 0, canvas.width, canvas.height);
    var e = 0,
        f = screenwidth,
        g = 0,
        h = screenheight;
    if (levelEditorOpened) {
        var i = glyphCount();
        editorRowCount = Math.ceil(i / (screenwidth - 1)), f -= 2, h -= 2 + editorRowCount
    } else if (flickscreen) {
        var j = getPlayerPositions();
        if (j.length > 0) {
            var k = j[0],
                l = k / level.height | 0,
                m = k % level.height | 0,
                n = l / screenwidth | 0,
                o = m / screenheight | 0;
            e = n * screenwidth, g = o * screenheight, f = Math.min(e + screenwidth, level.width), h = Math.min(g + screenheight, level.height), oldflickscreendat = [e, g, f, h]
        } else oldflickscreendat.length > 0 && (e = oldflickscreendat[0], g = oldflickscreendat[1], f = oldflickscreendat[2], h = oldflickscreendat[3])
    } else if (zoomscreen) {
        var j = getPlayerPositions();
        if (j.length > 0) {
            var k = j[0],
                l = k / level.height | 0,
                m = k % level.height | 0;
            e = Math.max(Math.min(l - (screenwidth / 2 | 0), level.width - screenwidth), 0), g = Math.max(Math.min(m - (screenheight / 2 | 0), level.height - screenheight), 0), f = Math.min(e + screenwidth, level.width), h = Math.min(g + screenheight, level.height), oldflickscreendat = [e, g, f, h]
        } else oldflickscreendat.length > 0 && (e = oldflickscreendat[0], g = oldflickscreendat[1], f = oldflickscreendat[2], h = oldflickscreendat[3])
    }
    for (var a = e; a < f; a++)
        for (var b = g; b < h; b++) {
            var p = b + a * level.height,
                q = level.getCellInto(p, _o12);
            for (var r = 0; r < state.objectCount; r++)
                if (q.get(r) != 0) {
                    var d = spriteimages[r];
                    ctx.drawImage(d, xoffset + (a - e) * cellwidth, yoffset + (b - g) * cellheight)
                }
        }
    levelEditorOpened && drawEditorIcons()
}

function drawEditorIcons() {
    var a = glyphImages.length,
        b = 0,
        c = glyphImages.length,
        d = c - b;
    ctx.drawImage(glyphPrintButton, xoffset - cellwidth, yoffset - cellheight * (1 + editorRowCount)), mouseCoordY === -1 - editorRowCount && mouseCoordX === -1 && ctx.drawImage(glyphMouseOver, xoffset - cellwidth, yoffset - cellheight * (1 + editorRowCount));
    var e = editorRowCount - (-mouseCoordY - 2) - 1,
        f = mouseCoordX + (screenwidth - 1) * e;
    for (var g = 0; g < d; g++) {
        var h = b + g,
            i = glyphImages[h],
            j = g % (screenwidth - 1),
            e = g / (screenwidth - 1) | 0;
        ctx.drawImage(i, xoffset + j * cellwidth, yoffset + e * cellheight - cellheight * (1 + editorRowCount)), mouseCoordX >= 0 && mouseCoordX < screenwidth - 1 && f === g && ctx.drawImage(glyphMouseOver, xoffset + j * cellwidth, yoffset + e * cellheight - cellheight * (1 + editorRowCount)), g === glyphSelectedIndex && ctx.drawImage(glyphHighlight, xoffset + j * cellwidth, yoffset + e * cellheight - cellheight * (1 + editorRowCount))
    }
    mouseCoordX >= -1 && mouseCoordY >= -1 && mouseCoordX < screenwidth - 1 && mouseCoordY < screenheight - 1 - editorRowCount && (mouseCoordX == -1 || mouseCoordY == -1 || mouseCoordX == screenwidth - 2 || mouseCoordY === screenheight - 2 - editorRowCount ? ctx.drawImage(glyphHighlightResize, xoffset + mouseCoordX * cellwidth, yoffset + mouseCoordY * cellheight) : ctx.drawImage(glyphHighlight, xoffset + mouseCoordX * cellwidth, yoffset + mouseCoordY * cellheight))
}

function canvasResize() {
    canvas.width = canvas.parentNode.clientWidth, canvas.height = canvas.parentNode.clientHeight, screenwidth = level.width, screenheight = level.height;
    if (state !== undefined) {
        flickscreen = state.metadata.flickscreen !== undefined, zoomscreen = state.metadata.zoomscreen !== undefined;
        if (levelEditorOpened) {
            screenwidth += 2;
            var a = glyphCount();
            editorRowCount = Math.ceil(a / (screenwidth - 1)), screenheight += 2 + editorRowCount
        } else flickscreen ? (screenwidth = state.metadata.flickscreen[0], screenheight = state.metadata.flickscreen[1]) : zoomscreen && (screenwidth = state.metadata.zoomscreen[0], screenheight = state.metadata.zoomscreen[1])
    }
    textMode && (levelEditorOpened = !1, screenwidth = titleWidth, screenheight = titleHeight), cellwidth = canvas.width / screenwidth, cellheight = canvas.height / screenheight;
    var b = 5,
        c = 5;
    textMode && (b = 6, c = 6), cellwidth = b * ~~(cellwidth / b), cellheight = c * ~~(cellheight / c), xoffset = 0, yoffset = 0, cellwidth > cellheight ? (cellwidth = cellheight, xoffset = (canvas.width - cellwidth * screenwidth) / 2, yoffset = (canvas.height - cellheight * screenheight) / 2) : (cellheight = cellwidth, yoffset = (canvas.height - cellheight * screenheight) / 2, xoffset = (canvas.width - cellwidth * screenwidth) / 2), magnification = cellwidth / b * 5 | 0, levelEditorOpened && (xoffset += cellwidth, yoffset += cellheight * (1 + editorRowCount)), cellwidth |= 0, cellheight |= 0, xoffset |= 0, yoffset |= 0;
    if (oldcellwidth != cellwidth || oldcellheight != cellheight || oldtextmode != textMode || oldfgcolor != state.fgcolor || forceRegenImages) forceRegenImages = !1, regenSpriteImages();
    oldcellheight = cellheight, oldcellwidth = cellwidth, oldtextmode = textMode, oldfgcolor = state.fgcolor, redraw()
}
var spriteimages, glyphImagesCorrespondance, glyphImages, glyphHighlight, glyphHighlightResize, glyphPrintButton, glyphMouseOver, glyphSelectedIndex = 0,
    editorRowCount = 1,
    canvasdict = {},
    canvas, ctx, x, y, cellwidth, cellheight, magnification, xoffset, yoffset;
window.addEventListener("resize", canvasResize, !1), canvas = document.getElementById("gameCanvas"), ctx = canvas.getContext("2d"), x = 0, y = 0;
var lastDownTarget, oldcellwidth = 0,
    oldcellheight = 0,
    oldtextmode = -1,
    oldfgcolor = -1,
    forceRegenImages = !1

function unloadGame() {
    state = introstate, level = new Level(0, 5, 5, 2, null), level.objects = new Int32Array(0), generateTitleScreen(), canvasResize(), redraw()
}

function generateTitleScreen() {
    titleMode = curlevel > 0 ? 1 : 0;
    if (state.levels.length === 0) {
        titleImage = intro_template;
        return
    }
    var a = "PuzzleScript Game";
    state.metadata.title !== undefined && (a = state.metadata.title), titleMode === 0 ? titleSelected ? titleImage = deepClone(titletemplate_firstgo_selected) : titleImage = deepClone(titletemplate_firstgo) : titleSelection === 0 ? titleSelected ? titleImage = deepClone(titletemplate_select0_selected) : titleImage = deepClone(titletemplate_select0) : titleSelected ? titleImage = deepClone(titletemplate_select1_selected) : titleImage = deepClone(titletemplate_select1);
    var b = "noaction" in state.metadata,
        c = "noundo" in state.metadata,
        d = "norestart" in state.metadata;
    c && d ? titleImage[11] = ".................................." : c ? titleImage[11] = ".R to restart....................." : d && (titleImage[11] = ".Z to undo....................."), b && (titleImage[10] = "..................................");
    for (var e = 0; e < titleImage.length; e++) titleImage[e] = titleImage[e].replace(/\./g, " ");
    var f = titleImage[0].length,
        g = wordwrap(a, titleImage[0].length);
    for (var e = 0; e < g.length; e++) {
        var h = g[e],
            i = h.length,
            j = (f - i) / 2 | 0,
            k = f - i - j,
            l = titleImage[1 + e];
        titleImage[1 + e] = l.slice(0, j) + h + l.slice(j + h.length)
    }
    if (state.metadata.author !== undefined) {
        var m = "by " + state.metadata.author,
            n = wordwrap(m, titleImage[0].length);
        for (var e = 0; e < n.length; e++) {
            var o = n[e],
                l = titleImage[3 + e];
            titleImage[3 + e] = l.slice(0, f - o.length - 1) + o + l[l.length - 1]
        }
    }
}

function deepClone(a) {
    if (!a) return a;
    var b = [Number, String, Boolean],
        c;
    b.forEach(function(b) {
        a instanceof b && (c = b(a))
    });
    if (typeof c == "undefined")
        if (Object.prototype.toString.call(a) === "[object Array]") c = [], a.forEach(function(a, b, d) {
            c[b] = deepClone(a)
        });
        else if (typeof a == "object")
        if (a.nodeType && typeof a.cloneNode == "function") var c = a.cloneNode(!0);
        else if (!a.prototype)
        if (a instanceof Date) c = new Date(a);
        else {
            c = {};
            for (var d in a) c[d] = deepClone(a[d])
        }
    else c = a;
    else c = a;
    return c
}

function wordwrap(a, b) {
    b = b || 75;
    var c = !0;
    if (!a) return a;
    var d = ".{1," + b + "}(\\s|$)" + (c ? "|.{" + b + "}|.+$" : "|\\S+?(\\s|$)");
    return a.match(RegExp(d, "g"))
}

function drawMessageScreen() {
    titleMode = 0, textMode = !0, titleImage = deepClone(messagecontainer_template);
    for (var a = 0; a < titleImage.length; a++) titleImage[a] = titleImage[a].replace(/\./g, " ");
    var b = titleImage[0].length,
        c;
    if (messagetext === "") {
        var d = state.levels[curlevel];
        c = d.message.trim()
    } else c = messagetext;
    splitMessage = wordwrap(c, titleImage[0].length);
    for (var a = 0; a < splitMessage.length; a++) {
        var e = splitMessage[a],
            f = 5 - (splitMessage.length / 2 | 0) + a,
            g = e.length,
            h = (b - g) / 2 | 0,
            i = b - g - h,
            j = titleImage[f];
        titleImage[f] = j.slice(0, h) + e + j.slice(h + e.length)
    }
    quittingMessageScreen && (titleImage[10] = titleImage[9]), canvasResize()
}

function loadLevelFromLevelDat(a, b, c) {
    c == null && (c = (Math.random() + Date.now()).toString()), loadedLevelSeed = c, RandomGen = new RNG(loadedLevelSeed), forceRegenImages = !0, titleScreen = !1, titleMode = curlevel > 0 ? 1 : 0, titleSelection = curlevel > 0 ? 1 : 0, titleSelected = !1, againing = !1;
    if (b === undefined) {
        consolePrint("Trying to access a level that doesn't exist.", !0);
        return
    }
    b.message === undefined ? (titleMode = 0, textMode = !1, level = b.clone(), RebuildLevelArrays(), backups = [], restartTarget = backupLevel(), "run_rules_on_level_start" in a.metadata && processInput(-1, !0)) : (tryPlayShowMessageSound(), drawMessageScreen(), canvasResize()), canDump === !0 && (inputHistory = [])
}

function loadLevelFromState(a, b, c) {
    var d = a.levels[b];
    curlevel = b, d.message === undefined && (b === 0 ? tryPlayStartLevelSound() : tryPlayStartLevelSound()), loadLevelFromLevelDat(a, d, c)
}

function tryPlaySimpleSound(a) {
    if (state.sfx_Events[a] !== undefined) {
        var b = state.sfx_Events[a];
        playSound(b)
    }
}

function tryPlayTitleSound() {
    tryPlaySimpleSound("titlescreen")
}

function tryPlayStartGameSound() {
    tryPlaySimpleSound("startgame")
}

function tryPlayEndGameSound() {
    tryPlaySimpleSound("endgame")
}

function tryPlayStartLevelSound() {
    tryPlaySimpleSound("startlevel")
}

function tryPlayEndLevelSound() {
    tryPlaySimpleSound("endlevel")
}

function tryPlayUndoSound() {
    tryPlaySimpleSound("undo")
}

function tryPlayRestartSound() {
    tryPlaySimpleSound("restart")
}

function tryPlayShowMessageSound() {
    tryPlaySimpleSound("showmessage")
}

function tryPlayCloseMessageSound() {
    tryPlaySimpleSound("closemessage")
}

function backupLevel() {
    var a = {
        dat: new Int32Array(level.objects),
        width: level.width,
        height: level.height
    };
    return a
}

function setGameState(a, b, c) {
    oldflickscreendat = [], timer = 0, autotick = 0, winning = !1, againing = !1, messageselected = !1, STRIDE_MOV = a.STRIDE_MOV, STRIDE_OBJ = a.STRIDE_OBJ, b === undefined && (b = ["restart"]), state.levels.length === 0 && b.length > 0 && b[0] === "rebuild" && (b = ["restart"]), c === undefined && (c = null), RandomGen = new RNG(c), state = a, window.console.log("setting game state :D "), backups = [], sprites = [];
    for (var d in state.objects)
        if (state.objects.hasOwnProperty(d)) {
            var e = state.objects[d],
                f = {
                    colors: e.colors,
                    dat: e.spritematrix
                };
            sprites[e.id] = f
        }
    state.metadata.realtime_interval !== undefined ? (autotick = 0, autotickinterval = state.metadata.realtime_interval * 1e3) : (autotick = 0, autotickinterval = 0), state.metadata.key_repeat_interval !== undefined ? repeatinterval = state.metadata.key_repeat_interval * 1e3 : repeatinterval = 150, state.metadata.again_interval !== undefined ? againinterval = state.metadata.again_interval * 1e3 : againinterval = 150, throttle_movement && autotickinterval === 0 && logWarning("throttle_movement is designed for use in conjunction with realtime_interval. Using it in other situations makes games gross and unresponsive, broadly speaking. Please don't."), norepeat_action = state.metadata.norepeat_action !== undefined;
    switch (b[0]) {
        case "restart":
            winning = !1, timer = 0, titleScreen = !0, tryPlayTitleSound(), textMode = !0, titleSelection = curlevel > 0 ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, curlevel > 0 && (titleMode = 1), generateTitleScreen();
            break;
        case "rebuild":
            break;
        case "loadLevel":
            var g = b[1];
            curlevel = i, winning = !1, timer = 0, titleScreen = !1, textMode = !1, titleSelection = curlevel > 0 ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, loadLevelFromState(state, g, c);
            break;
        case "levelline":
            var h = b[1];
            for (var i = state.levels.length - 1; i >= 0; i--) {
                var j = state.levels[i];
                if (j.lineNumber <= h + 1) {
                    curlevel = i, winning = !1, timer = 0, titleScreen = !1, textMode = !1, titleSelection = curlevel > 0 ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, loadLevelFromState(state, i);
                    break
                }
            }
    }
    canDump === !0 && (inputHistory = []), canvasResize();
    if (canYoutube && "youtube" in state.metadata) {
        var k = state.metadata.youtube,
            l = "https://youtube.googleapis.com/v/" + k + "?autoplay=1&loop=1&playlist=" + k;
        ifrm = document.createElement("IFRAME"), ifrm.setAttribute("src", l), ifrm.style.visibility = "hidden", ifrm.style.width = "500px", ifrm.style.height = "500px", ifrm.style.position = "absolute", ifrm.style.top = "-1000px", ifrm.style.left = "-1000px", document.body.appendChild(ifrm)
    }
}

function RebuildLevelArrays() {
    level.movements = new Int32Array(level.n_tiles * STRIDE_MOV), level.rigidMovementAppliedMask = [], level.rigidGroupIndexMask = [], level.rowCellContents = [], level.colCellContents = [], level.mapCellContents = new BitVec(STRIDE_OBJ), _movementsVec = new BitVec(STRIDE_MOV), _o1 = new BitVec(STRIDE_OBJ), _o2 = new BitVec(STRIDE_OBJ), _o2_5 = new BitVec(STRIDE_OBJ), _o3 = new BitVec(STRIDE_OBJ), _o4 = new BitVec(STRIDE_OBJ), _o5 = new BitVec(STRIDE_OBJ), _o6 = new BitVec(STRIDE_OBJ), _o7 = new BitVec(STRIDE_OBJ), _o8 = new BitVec(STRIDE_OBJ), _o9 = new BitVec(STRIDE_OBJ), _o10 = new BitVec(STRIDE_OBJ), _o11 = new BitVec(STRIDE_OBJ), _o12 = new BitVec(STRIDE_OBJ), _m1 = new BitVec(STRIDE_MOV), _m2 = new BitVec(STRIDE_MOV), _m3 = new BitVec(STRIDE_MOV);
    for (var a = 0; a < level.height; a++) level.rowCellContents[a] = new BitVec(STRIDE_OBJ);
    for (var a = 0; a < level.width; a++) level.colCellContents[a] = new BitVec(STRIDE_OBJ);
    for (var a = 0; a < level.n_tiles; a++) level.rigidMovementAppliedMask[a] = new BitVec(STRIDE_MOV), level.rigidGroupIndexMask[a] = new BitVec(STRIDE_MOV)
}

function restoreLevel(a) {
    oldflickscreendat = [], level.objects = new Int32Array(a.dat);
    if (level.width !== a.width || level.height !== a.height) level.width = a.width, level.height = a.height, level.n_tiles = a.width * a.height, RebuildLevelArrays();
    else {
        for (var b = 0; b < level.n_tiles; b++) level.movements[b] = 0, level.rigidMovementAppliedMask[b] = 0, level.rigidGroupIndexMask[b] = 0;
        for (var b = 0; b < level.height; b++) {
            var c = level.rowCellContents[b];
            c.setZero()
        }
        for (var b = 0; b < level.width; b++) {
            var d = level.colCellContents[b];
            d.setZero()
        }
    }
    againing = !1, messagetext = "", level.commandQueue = []
}

function DoRestart(a) {
    if (a !== !0 && "norestart" in state.metadata) return;
    a === !1 && backups.push(backupLevel()), verbose_logging && consolePrint("--- restarting ---", !0), restoreLevel(restartTarget), tryPlayRestartSound(), "run_rules_on_level_start" in state.metadata && processInput(-1, !0), level.commandQueue = []
}

function DoUndo(a) {
    if (!levelEditorOpened && "noundo" in state.metadata && a !== !0) return;
    verbose_logging && consolePrint("--- undoing ---", !0);
    if (backups.length > 0) {
        var b = backups[backups.length - 1];
        restoreLevel(b), backups = backups.splice(0, backups.length - 1), a || tryPlayUndoSound()
    }
}

function getPlayerPositions() {
    var a = [],
        b = state.playerMask;
    for (i = 0; i < level.n_tiles; i++) level.getCellInto(i, _o11), b.anyBitsInCommon(_o11) && a.push(i);
    return a
}

function getLayersOfMask(a) {
    var b = [];
    for (var c = 0; c < state.objectCount; c++)
        if (a.get(c)) {
            var d = state.idDict[c],
                e = state.objects[d];
            b.push(e.layer)
        }
    return b
}

function moveEntitiesAtIndex(a, b, c) {
    var d = level.getCell(a);
    d.iand(b);
    var e = getLayersOfMask(d),
        f = level.getMovements(a);
    for (var g = 0; g < e.length; g++) f.ishiftor(c, 5 * e[g]);
    level.setMovements(a, f)
}

function startMovement(a) {
    var b = !1,
        c = getPlayerPositions();
    for (var d = 0; d < c.length; d++) {
        var e = c[d];
        moveEntitiesAtIndex(e, state.playerMask, a)
    }
    return c
}

function repositionEntitiesOnLayer(a, b, c) {
    var d = dirMasksDelta[c],
        e = d[0],
        f = d[1],
        g = a / level.height | 0,
        h = a % level.height,
        i = level.width - 1,
        j = level.height - 1;
    if (g === 0 && e < 0 || g === i && e > 0 || h === 0 && f < 0 || h === j && f > 0) return !1;
    var k = (a + d[1] + d[0] * level.height) % level.n_tiles,
        l = state.layerMasks[b],
        m = level.getCellInto(k, _o7),
        n = level.getCellInto(a, _o8);
    if (l.anyBitsInCommon(m) && c != 16) return !1;
    for (var o = 0; o < state.sfx_MovementMasks.length; o++) {
        var p = state.sfx_MovementMasks[o],
            q = p.objectMask;
        if (q.anyBitsInCommon(n)) {
            var r = level.getMovements(a),
                s = p.directionMask;
            r.anyBitsInCommon(s) && seedsToPlay_CanMove.indexOf(p.seed) === -1 && seedsToPlay_CanMove.push(p.seed)
        }
    }
    var t = n.clone();
    n.iclear(l), t.iand(l), m.ior(t), level.setCell(a, n), level.setCell(k, m);
    var u = k / level.height | 0,
        v = k % level.height;
    return level.colCellContents[u].ior(t), level.rowCellContents[v].ior(t), level.mapCellContents.ior(l), !0
}

function repositionEntitiesAtCell(a) {
    var b = level.getMovements(a);
    if (b.iszero()) return !1;
    var c = !1;
    for (var d = 0; d < level.layerCount; d++) {
        var e = b.getshiftor(31, 5 * d);
        if (e !== 0) {
            var f = repositionEntitiesOnLayer(a, d, e);
            f && (b.ishiftclear(e, 5 * d), c = !0)
        }
    }
    return level.setMovements(a, b), c
}

function Level(a, b, c, d, e) {
    this.lineNumber = a, this.width = b, this.height = c, this.n_tiles = b * c, this.objects = e, this.layerCount = d, this.commandQueue = []
}

function BitVec(a) {
    return this.data = new Int32Array(a), this
}

function Rule(a) {
    this.direction = a[0], this.patterns = a[1], this.hasReplacements = a[2], this.lineNumber = a[3], this.isEllipsis = a[4], this.groupNumber = a[5], this.isRigid = a[6], this.commands = a[7], this.isRandom = a[8], this.cellRowMasks = a[9], this.cellRowMatches = [];
    for (var b = 0; b < this.patterns.length; b++) this.cellRowMatches.push(this.generateCellRowMatchesFunction(this.patterns[b], this.isEllipsis[b]))
}

function CellPattern(a) {
    this.objectsPresent = a[0], this.objectsMissing = a[1], this.anyObjectsPresent = a[2], this.movementsPresent = a[3], this.movementsMissing = a[4], this.matches = this.generateMatchFunction(), this.replacement = a[5]
}

function CellReplacement(a) {
    this.objectsClear = a[0], this.objectsSet = a[1], this.movementsClear = a[2], this.movementsSet = a[3], this.movementsLayerMask = a[4], this.randomEntityMask = a[5], this.randomDirMask = a[6]
}

function DoesCellRowMatchWildCard(a, b, c, d, e) {
    e === undefined && (e = 0);
    var f = b[0];
    if (f.matches(c)) {
        var g = dirMasksDelta[a],
            h = g[0] * level.height,
            i = g[1],
            j = c;
        for (var k = 1; k < b.length; k += 1) {
            j = (j + i + h) % level.n_tiles;
            var f = b[k];
            if (f === ellipsisPattern) {
                for (var l = e; l < d; l++) {
                    var m = j;
                    m = (m + (i + h) * l + level.n_tiles) % level.n_tiles;
                    for (var n = k + 1; n < b.length; n++) {
                        f = b[n];
                        if (!f.matches(m)) break;
                        m = (m + i + h) % level.n_tiles
                    }
                    if (n >= b.length) return !0
                }
                break
            }
            if (!f.matches(j)) break
        }
    }
    return !1
}

function DoesCellRowMatch(a, b, c, d) {
    var e = b[0];
    if (e.matches(c)) {
        var f = dirMasksDelta[a],
            g = f[0] * level.height,
            h = f[1],
            i = b.length,
            j = c;
        for (var k = 1; k < i; k++) {
            j = (j + h + g) % level.n_tiles, e = b[k], e === ellipsisPattern && (j = (j + (h + g) * d) % level.n_tiles);
            if (!e.matches(j)) break
        }
        if (k >= b.length) return !0
    }
    return !1
}

function matchCellRow(a, b, c, d) {
    var e = [];
    if (!d.bitsSetInArray(level.mapCellContents.data)) return e;
    var f = 0,
        g = level.width,
        h = 0,
        i = level.height,
        j = c.length;
    switch (a) {
        case 1:
            h += j - 1;
            break;
        case 2:
            i -= j - 1;
            break;
        case 4:
            f += j - 1;
            break;
        case 8:
            g -= j - 1;
            break;
        default:
            window.console.log("EEEP " + a)
    }
    var k = a > 2;
    if (k)
        for (var l = h; l < i; l++) {
            if (!d.bitsSetInArray(level.rowCellContents[l].data)) continue;
            for (var m = f; m < g; m++) {
                var n = m * level.height + l;
                b(c, n) && e.push(n)
            }
        } else
            for (var m = f; m < g; m++) {
                if (!d.bitsSetInArray(level.colCellContents[m].data)) continue;
                for (var l = h; l < i; l++) {
                    var n = m * level.height + l;
                    b(c, n) && e.push(n)
                }
            }
    return e
}

function matchCellRowWildCard(a, b, c, d) {
    var e = [];
    if (!d.bitsSetInArray(level.mapCellContents.data)) return e;
    var f = 0,
        g = level.width,
        h = 0,
        i = level.height,
        j = c.length - 1;
    switch (a) {
        case 1:
            h += j - 1;
            break;
        case 2:
            i -= j - 1;
            break;
        case 4:
            f += j - 1;
            break;
        case 8:
            g -= j - 1;
            break;
        default:
            window.console.log("EEEP2 " + a)
    }
    var k = a > 2;
    if (k)
        for (var l = h; l < i; l++) {
            if (!d.bitsSetInArray(level.rowCellContents[l].data)) continue;
            for (var m = f; m < g; m++) {
                var n = m * level.height + l,
                    o;
                a === 4 ? o = m - j + 2 : a === 8 ? o = level.width - (m + j) + 1 : window.console.log("EEEP2 " + a), e.push.apply(e, b(c, n, o, 0))
            }
        } else
            for (var m = f; m < g; m++) {
                if (!d.bitsSetInArray(level.colCellContents[m].data)) continue;
                for (var l = h; l < i; l++) {
                    var n = m * level.height + l,
                        o;
                    a === 2 ? o = level.height - (l + j) + 1 : a === 1 ? o = l - j + 2 : window.console.log("EEEP2 " + a), e.push.apply(e, b(c, n, o, 0))
                }
            }
    return e
}

function generateTuples(a) {
    var b = [
        []
    ];
    for (var c = 0; c < a.length; c++) {
        var d = a[c],
            e = [];
        for (var f = 0; f < d.length; f++) {
            var g = d[f];
            for (var h = 0; h < b.length; h++) {
                var i = b[h],
                    j = i.concat([g]);
                e.push(j)
            }
        }
        b = e
    }
    return b
}

function commitPreservationState(a) {
    var b = {
        ruleGroupIndex: a,
        objects: new Int32Array(level.objects),
        movements: new Int32Array(level.movements),
        rigidGroupIndexMask: level.rigidGroupIndexMask.concat([]),
        rigidMovementAppliedMask: level.rigidMovementAppliedMask.concat([]),
        bannedGroup: level.bannedGroup.concat([])
    };
    return rigidBackups[a] = b, b
}

function restorePreservationState(a) {
    level.objects = new Int32Array(a.objects), level.movements = new Int32Array(a.movements), level.rigidGroupIndexMask = a.rigidGroupIndexMask.concat([]), level.rigidMovementAppliedMask = a.rigidMovementAppliedMask.concat([]), sfxCreateMask = new BitVec(STRIDE_OBJ), sfxDestroyMask = new BitVec(STRIDE_OBJ)
}

function showTempMessage() {
    keybuffer = [], textMode = !0, titleScreen = !1, quittingMessageScreen = !1, messageselected = !1, tryPlayShowMessageSound(), drawMessageScreen(), canvasResize()
}

function applyRandomRuleGroup(a) {
    var b = !1,
        c = [];
    for (var d = 0; d < a.length; d++) {
        var e = a[d],
            f = e.findMatches();
        if (f.length > 0) {
            var g = generateTuples(f);
            for (var h = 0; h < g.length; h++) {
                var i = g[h];
                c.push([d, i])
            }
        }
    }
    if (c.length === 0) return !1;
    var j = c[Math.floor(RandomGen.uniform() * c.length)],
        d = j[0],
        e = a[d],
        k = dirMasksDelta[e.direction],
        i = j[1],
        l = !1,
        m = e.applyAt(k, i, l);
    return e.queueCommands(), m
}

function applyRuleGroup(a) {
    if (a[0].isRandom) return applyRandomRuleGroup(a);
    var b = !1,
        c = !0,
        d = 0;
    while (c) {
        d++;
        if (d > 200) {
            logErrorCacheable("Got caught looping lots in a rule group :O", a[0].lineNumber, !0);
            break
        }
        c = !1;
        for (var e = 0; e < a.length; e++) {
            var f = a[e];
            c = f.tryApply() || c
        }
        c && (b = !0)
    }
    return b
}

function applyRules(a, b, c) {
    var d = c > 0,
        e = 0;
    for (var f = c; f < a.length;) {
        if (!level.bannedGroup[f]) {
            var g = a[f];
            d = applyRuleGroup(g) || d
        }
        if (d && b[f] !== undefined) {
            f = b[f], d = !1, e++;
            if (e > 200) {
                var g = a[f];
                logErrorCacheable("got caught in an endless startloop...endloop vortex, escaping!", g[0].lineNumber, !0);
                break
            }
        } else {
            f++;
            if (f === a.length && d && b[f] !== undefined) {
                f = b[f], d = !1, e++;
                if (e > 200) {
                    var g = a[f];
                    logErrorCacheable("got caught in an endless startloop...endloop vortex, escaping!", g[0].lineNumber, !0);
                    break
                }
            }
        }
    }
}

function resolveMovements(a) {
    var b = !0;
    while (b) {
        b = !1;
        for (var c = 0; c < level.n_tiles; c++) b = repositionEntitiesAtCell(c) || b
    }
    var d = !1;
    for (var c = 0; c < level.n_tiles; c++) {
        var e = level.getCellInto(c, _o6),
            f = level.getMovements(c);
        if (!f.iszero()) {
            var g = level.rigidMovementAppliedMask[c];
            if (g !== 0) {
                f.iand(g);
                if (!f.iszero())
                    for (var h = 0; h < level.layerCount; h++) {
                        var i = f.getshiftor(31, 5 * h);
                        if (i !== 0) {
                            var j = level.rigidGroupIndexMask[c],
                                k = j.getshiftor(31, 5 * h);
                            k--;
                            var l = state.rigidGroupIndex_to_GroupIndex[k];
                            level.bannedGroup[l] = !0, d = !0;
                            break
                        }
                    }
            }
            for (var h = 0; h < state.sfx_MovementFailureMasks.length; h++) {
                var m = state.sfx_MovementFailureMasks[h],
                    n = m.objectMask;
                if (n.anyBitsInCommon(e)) {
                    var o = m.directionMask;
                    f.anyBitsInCommon(o) && seedsToPlay_CantMove.indexOf(m.seed) === -1 && seedsToPlay_CantMove.push(m.seed)
                }
            }
        }
        for (var h = 0; h < STRIDE_MOV; h++) level.movements[h + c * STRIDE_MOV] = 0;
        level.rigidGroupIndexMask[c] = 0, level.rigidMovementAppliedMask[c] = 0
    }
    return d
}

function calculateRowColMasks() {
    for (var a = 0; a < level.mapCellContents.length; a++) level.mapCellContents[a] = 0;
    for (var a = 0; a < level.width; a++) {
        var b = level.colCellContents[a];
        b.setZero()
    }
    for (var a = 0; a < level.height; a++) {
        var c = level.rowCellContents[a];
        c.setZero()
    }
    for (var a = 0; a < level.width; a++)
        for (var d = 0; d < level.height; d++) {
            var e = d + a * level.height,
                f = level.getCellInto(e, _o9);
            level.mapCellContents.ior(f), level.rowCellContents[d].ior(f), level.colCellContents[a].ior(f)
        }
}

function processInput(a, b, c) {
    againing = !1, verbose_logging && (a === -1 ? consolePrint("Turn starts with no input.") : (consolePrint("======================="), consolePrint("Turn starts with input of " + ["up", "left", "down", "right", "action"][a] + ".")));
    var d = backupLevel(),
        e = [];
    if (a <= 4) {
        if (a >= 0) {
            switch (a) {
                case 0:
                    a = parseInt("00001", 2);
                    break;
                case 1:
                    a = parseInt("00100", 2);
                    break;
                case 2:
                    a = parseInt("00010", 2);
                    break;
                case 3:
                    a = parseInt("01000", 2);
                    break;
                case 4:
                    a = parseInt("10000", 2)
            }
            e = startMovement(a)
        }
        var f = 0,
            g = !0;
        level.bannedGroup = [], rigidBackups = [], level.commandQueue = [];
        var h = 0,
            i = !1,
            j = commitPreservationState();
        messagetext = "", sfxCreateMask = new BitVec(STRIDE_OBJ), sfxDestroyMask = new BitVec(STRIDE_OBJ), seedsToPlay_CanMove = [], seedsToPlay_CantMove = [], calculateRowColMasks();
        while (g || i) {
            g = !1, i = !1, f++, verbose_logging && consolePrint("applying rules"), applyRules(state.rules, state.loopPoint, h);
            var k = resolveMovements();
            k ? (i = !0, restorePreservationState(j), h = 0) : (verbose_logging && consolePrint("applying late rules"), applyRules(state.lateRules, state.lateLoopPoint, 0), h = 0)
        }
        f >= 50 && window.console.log("looped through 50 times, gave up. too many loops!");
        if (e.length > 0 && state.metadata.require_player_movement !== undefined) {
            var l = !1;
            for (var f = 0; f < e.length; f++) {
                var m = e[f],
                    n = level.getCell(m);
                if (state.playerMask.bitsClearInArray(n.data)) {
                    l = !0;
                    break
                }
            }
            if (l === !1) return verbose_logging && (consolePrint("require_player_movement set, but no player movement detected, so cancelling turn."), consoleCacheDump()), backups.push(d), DoUndo(!0), !1
        }
        if (level.commandQueue.indexOf("cancel") >= 0) return verbose_logging && (consolePrint("CANCEL command executed, cancelling turn."), consoleCacheDump()), backups.push(d), DoUndo(!0), !1;
        if (level.commandQueue.indexOf("restart") >= 0) return verbose_logging && (consolePrint("RESTART command executed, reverting to restart state."), consoleCacheDump()), backups.push(d), DoRestart(!0), !0;
        if (c && level.commandQueue.indexOf("win") >= 0) return !0;
        var o = !1;
        for (var f = 0; f < level.objects.length; f++)
            if (level.objects[f] !== d.dat[f]) {
                if (c) return verbose_logging && consoleCacheDump(), backups.push(d), DoUndo(!0), !0;
                a !== -1 && backups.push(d), o = !0;
                break
            }
        if (c) return verbose_logging && consoleCacheDump(), !1;
        for (var f = 0; f < seedsToPlay_CantMove.length; f++) playSound(seedsToPlay_CantMove[f]);
        for (var f = 0; f < seedsToPlay_CanMove.length; f++) playSound(seedsToPlay_CanMove[f]);
        for (var f = 0; f < state.sfx_CreationMasks.length; f++) {
            var p = state.sfx_CreationMasks[f];
            sfxCreateMask.anyBitsInCommon(p.objectMask) && playSound(p.seed)
        }
        for (var f = 0; f < state.sfx_DestructionMasks.length; f++) {
            var p = state.sfx_DestructionMasks[f];
            sfxDestroyMask.anyBitsInCommon(p.objectMask) && playSound(p.seed)
        }
        for (var f = 0; f < level.commandQueue.length; f++) {
            var q = level.commandQueue[f];
            q.charAt(1) === "f" && tryPlaySimpleSound(q), unitTesting === !1 && q === "message" && showTempMessage()
        }
        textMode === !1 && (b === undefined || b === !1) && (verbose_logging && consolePrint("Checking win condition."), checkWin());
        if (!winning) {
            level.commandQueue.indexOf("checkpoint") >= 0 && (verbose_logging && consolePrint("CHECKPOINT command executed, saving current state to the restart state."), restartTarget = backupLevel());
            if (level.commandQueue.indexOf("again") >= 0 && o) {
                var r = messagetext,
                    s = verbose_logging;
                verbose_logging = !1, processInput(-1, !0, !0) ? (verbose_logging = s, verbose_logging && consolePrint("AGAIN command executed, with changes detected - will execute another turn."), againing = !0, timer = 0) : (verbose_logging = s, verbose_logging && consolePrint("AGAIN command not executed, it wouldn't make any changes.")), verbose_logging = s, messagetext = r, verbose_logging = s
            }
        }
        level.commandQueue = []
    }
    return verbose_logging && consoleCacheDump(), winning && (againing = !1), o
}

function checkWin() {
    if (levelEditorOpened) return;
    if (level.commandQueue.indexOf("win") >= 0) {
        consolePrint("Win Condition Satisfied"), DoWin();
        return
    }
    var a = !1;
    if (state.winconditions.length > 0) {
        var b = !0;
        for (var c = 0; c < state.winconditions.length; c++) {
            var d = state.winconditions[c],
                e = d[1],
                f = d[2],
                g = !0;
            switch (d[0]) {
                case -1:
                    for (var h = 0; h < level.n_tiles; h++) {
                        var i = level.getCellInto(h, _o10);
                        if (!e.bitsClearInArray(i.data) && !f.bitsClearInArray(i.data)) {
                            g = !1;
                            break
                        }
                    }
                    break;
                case 0:
                    var j = !1;
                    for (var h = 0; h < level.n_tiles; h++) {
                        var i = level.getCellInto(h, _o10);
                        if (!e.bitsClearInArray(i.data) && !f.bitsClearInArray(i.data)) {
                            j = !0;
                            break
                        }
                    }
                    j === !1 && (g = !1);
                    break;
                case 1:
                    for (var h = 0; h < level.n_tiles; h++) {
                        var i = level.getCellInto(h, _o10);
                        if (!e.bitsClearInArray(i.data) && f.bitsClearInArray(i.data)) {
                            g = !1;
                            break
                        }
                    }
            }
            g === !1 && (b = !1)
        }
        a = b
    }
    a && (consolePrint("Win Condition Satisfied"), DoWin())
}

function DoWin() {
    if (winning) return;
    againing = !1, tryPlayEndLevelSound();
    if (unitTesting) {
        nextLevel();
        return
    }
    winning = !0, timer = 0
}

function nextLevel() {
    keybuffer = [], againing = !1, messagetext = "", titleScreen ? (titleSelection === 0 && (curlevel = 0), loadLevelFromState(state, curlevel)) : curlevel < state.levels.length - 1 ? (curlevel++, textMode = !1, titleScreen = !1, quittingMessageScreen = !1, messageselected = !1, loadLevelFromState(state, curlevel)) : (curlevel = 0, goToTitleScreen(), tryPlayEndGameSound());
    try {
        !window.localStorage || (localStorage[document.URL] = curlevel)
    } catch (a) {}
    canvasResize(), canDump === !0 && (inputHistory = [])
}

function goToTitleScreen() {
    againing = !1, messagetext = "", titleScreen = !0, textMode = !0, titleSelection = curlevel > 0 ? 1 : 0, generateTitleScreen()
}
var RandomGen = new RNG,
    intro_template = ["..................................", "..................................", "..................................", "......Puzzle Script Terminal......", "..............v 1.0...............", "..................................", "..................................", "..................................", ".........insert cartridge.........", "..................................", "..................................", "..................................", ".................................."],
    messagecontainer_template = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..........X to continue...........", "..................................", ".................................."],
    titletemplate_firstgo = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..........#.start game.#..........", "..................................", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
    titletemplate_select0 = ["..................................", "..................................", "..................................", "..................................", "..................................", "...........#.new game.#...........", "..................................", ".............continue.............", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
    titletemplate_select1 = ["..................................", "..................................", "..................................", "..................................", "..................................", ".............new game.............", "..................................", "...........#.continue.#...........", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
    titletemplate_firstgo_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "###########.start game.###########", "..................................", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
    titletemplate_select0_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", "############.new game.############", "..................................", ".............continue.............", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
    titletemplate_select1_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", ".............new game.............", "..................................", "############.continue.############", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
    titleImage = [],
    titleWidth = titletemplate_select1[0].length,
    titleHeight = titletemplate_select1.length,
    textMode = !0,
    titleScreen = !0,
    titleMode = 0,
    titleSelection = 0,
    titleSelected = !1,
    introstate = {
        title: "2D Whale World",
        attribution: "increpare",
        objectCount: 2,
        metadata: [],
        levels: [],
        bgcolor: "#000000",
        fgcolor: "#FFFFFF"
    },
    state = introstate,
    splitMessage = [],
    loadedLevelSeed = 0,
    sprites = [{
        color: "#423563",
        dat: [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ]
    }, {
        color: "#252342",
        dat: [
            [0, 0, 1, 0, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0]
        ]
    }];
generateTitleScreen(), canvasResize();
var backups = [],
    restartTarget, messagetext = "",
    zoomscreen = !1,
    flickscreen = !1,
    screenwidth = 0,
    screenheight = 0,
    dirMasksDelta = {
        1: [0, -1],
        2: [0, 1],
        4: [-1, 0],
        8: [1, 0],
        15: [0, 0],
        16: [0, 0],
        3: [0, 0]
    },
    dirMaskName = {
        1: "up",
        2: "down",
        4: "left",
        8: "right",
        15: "?",
        16: "action",
        3: "no"
    },
    seedsToPlay_CanMove = [],
    seedsToPlay_CantMove = [];
Level.prototype.clone = function() {
    var a = new Level(this.lineNumber, this.width, this.height, this.layerCount, null);
    return a.objects = new Int32Array(this.objects), a
}, Level.prototype.getCell = function(a) {
    return new BitVec(this.objects.subarray(a * STRIDE_OBJ, a * STRIDE_OBJ + STRIDE_OBJ))
}, Level.prototype.getCellInto = function(a, b) {
    for (var c = 0; c < STRIDE_OBJ; c++) b.data[c] = this.objects[a * STRIDE_OBJ + c];
    return b
}, Level.prototype.setCell = function(a, b) {
    for (var c = 0; c < b.data.length; ++c) this.objects[a * STRIDE_OBJ + c] = b.data[c]
};
var _movementsVec;
Level.prototype.getMovements = function(a) {
    for (var b = 0; b < STRIDE_MOV; b++) _movementsVec.data[b] = this.movements[a * STRIDE_MOV + b];
    return _movementsVec
}, Level.prototype.setMovements = function(a, b) {
    for (var c = 0; c < b.data.length; ++c) this.movements[a * STRIDE_MOV + c] = b.data[c]
};
var ellipsisPattern = ["ellipsis"];
BitVec.prototype.cloneInto = function(a) {
    for (var b = 0; b < this.data.length; ++b) a.data[b] = this.data[b];
    return a
}, BitVec.prototype.clone = function() {
    return new BitVec(this.data)
}, BitVec.prototype.iand = function(a) {
    for (var b = 0; b < this.data.length; ++b) this.data[b] &= a.data[b]
}, BitVec.prototype.ior = function(a) {
    for (var b = 0; b < this.data.length; ++b) this.data[b] |= a.data[b]
}, BitVec.prototype.iclear = function(a) {
    for (var b = 0; b < this.data.length; ++b) this.data[b] &= ~a.data[b]
}, BitVec.prototype.ibitset = function(a) {
    this.data[a >> 5] |= 1 << (a & 31)
}, BitVec.prototype.ibitclear = function(a) {
    this.data[a >> 5] &= ~(1 << (a & 31))
}, BitVec.prototype.get = function(a) {
    return (this.data[a >> 5] & 1 << (a & 31)) !== 0
}, BitVec.prototype.getshiftor = function(a, b) {
    var c = b & 31,
        d = this.data[b >> 5] >>> c;
    return c && (d |= this.data[(b >> 5) + 1] << 32 - c), d & a
}, BitVec.prototype.ishiftor = function(a, b) {
    var c = b & 31,
        d = a << c;
    this.data[b >> 5] |= d, c && (high = a >> 32 - c, this.data[(b >> 5) + 1] |= high)
}, BitVec.prototype.ishiftclear = function(a, b) {
    var c = b & 31,
        d = a << c;
    this.data[b >> 5] &= ~d;
    if (c) {
        var e = a >> 32 - (b & 31);
        this.data[(b >> 5) + 1] &= ~e
    }
}, BitVec.prototype.equals = function(a) {
    if (this.data.length !== a.data.length) return !1;
    for (var b = 0; b < this.data.length; ++b)
        if (this.data[b] !== a.data[b]) return !1;
    return !0
}, BitVec.prototype.setZero = function() {
    for (var a = 0; a < this.data.length; ++a) this.data[a] = 0
}, BitVec.prototype.iszero = function() {
    for (var a = 0; a < this.data.length; ++a)
        if (this.data[a]) return !1;
    return !0
}, BitVec.prototype.bitsSetInArray = function(a) {
    for (var b = 0; b < this.data.length; ++b)
        if ((this.data[b] & a[b]) !== this.data[b]) return !1;
    return !0
}, BitVec.prototype.bitsClearInArray = function(a) {
    for (var b = 0; b < this.data.length; ++b)
        if (this.data[b] & a[b]) return !1;
    return !0
}, BitVec.prototype.anyBitsInCommon = function(a) {
    return !this.bitsClearInArray(a.data)
}, Rule.prototype.generateCellRowMatchesFunction = function(a, b) {
    if (b == 0) {
        var c = dirMasksDelta[this.direction],
            d = c[0],
            e = c[1],
            f = a.length,
            g = "var d = " + e + "+" + d + "*level.height;\n",
            h = STRIDE_OBJ === 1 ? "" : "*" + STRIDE_OBJ;
        for (var i = 0; i < STRIDE_OBJ; ++i) g += "var cellObjects" + i + " = level.objects[i" + h + (i ? "+" + i : "") + "];\n";
        h = STRIDE_MOV === 1 ? "" : "*" + STRIDE_MOV;
        for (var i = 0; i < STRIDE_MOV; ++i) g += "var cellMovements" + i + " = level.movements[i" + h + (i ? "+" + i : "") + "];\n";
        g += "return " + a[0].generateMatchString("0_");
        for (var j = 1; j < f; j++) g += "&&cellRow[" + j + "].matches((i+" + j + "*d)%level.n_tiles)";
        return g += ";", g in matchCache ? matchCache[g] : matchCache[g] = new Function("cellRow", "i", g)
    }
    var c = dirMasksDelta[this.direction],
        d = c[0],
        e = c[1],
        f = a.length,
        g = "var d = " + e + "+" + d + "*level.height;\n";
    g += "var result = [];\n", g += "if(cellRow[0].matches(i)";
    var j = 1;
    for (; a[j] !== ellipsisPattern; j++) g += "&&cellRow[" + j + "].matches((i+" + j + "*d)%level.n_tiles)";
    j++, g += ") {\n", g += "\tfor (var k=kmin;k<kmax;k++) {\n", g += "\t\tif(cellRow[" + j + "].matches((i+d*(k+" + (j - 1) + "))%level.n_tiles)", j++;
    for (; j < f; j++) g += "&&cellRow[" + j + "].matches((i+d*(k+" + (j - 1) + "))%level.n_tiles)";
    return g += "){\n", g += "\t\t\tresult.push([i,k]);\n", g += "\t\t}\n", g += "\t}\n", g += "}\n", g += "return result;", g in matchCache ? matchCache[g] : matchCache[g] = new Function("cellRow", "i", "kmax", "kmin", g)
}, Rule.prototype.toJSON = function() {
    return [this.direction, this.patterns, this.hasReplacements, this.lineNumber, this.isEllipsis, this.groupNumber, this.isRigid, this.commands, this.isRandom, this.cellRowMasks]
};
var STRIDE_OBJ = 1,
    STRIDE_MOV = 1,
    matchCache = {};
CellPattern.prototype.generateMatchString = function() {
    var a = "(true";
    for (var b = 0; b < Math.max(STRIDE_OBJ, STRIDE_MOV); ++b) {
        var c = "cellObjects" + b,
            d = "cellMovements" + b,
            e = this.objectsPresent.data[b],
            f = this.objectsMissing.data[b],
            g = this.movementsPresent.data[b],
            h = this.movementsMissing.data[b];
        e && (e & e - 1 ? a += "\t\t&& ((" + c + "&" + e + ")===" + e + ")\n" : a += "\t\t&& (" + c + "&" + e + ")\n"), f && (a += "\t\t&& !(" + c + "&" + f + ")\n"), g && (g & g - 1 ? a += "\t\t&& ((" + d + "&" + g + ")===" + g + ")\n" : a += "\t\t&& (" + d + "&" + g + ")\n"), h && (a += "\t\t&& !(" + d + "&" + h + ")\n")
    }
    for (var i = 0; i < this.anyObjectsPresent.length; i++) {
        a += "\t\t&& (0";
        for (var b = 0; b < STRIDE_OBJ; ++b) {
            var j = this.anyObjectsPresent[i].data[b];
            j && (a += "|(cellObjects" + b + "&" + j + ")")
        }
        a += ")"
    }
    return a += "\t)", a
}, CellPattern.prototype.generateMatchFunction = function() {
    var a, b = "",
        c = STRIDE_OBJ === 1 ? "" : "*" + STRIDE_OBJ;
    for (var a = 0; a < STRIDE_OBJ; ++a) b += "\tvar cellObjects" + a + " = level.objects[i" + c + (a ? "+" + a : "") + "];\n";
    c = STRIDE_MOV === 1 ? "" : "*" + STRIDE_MOV;
    for (var a = 0; a < STRIDE_MOV; ++a) b += "\tvar cellMovements" + a + " = level.movements[i" + c + (a ? "+" + a : "") + "];\n";
    return b += "return " + this.generateMatchString() + ";", b in matchCache ? matchCache[b] : matchCache[b] = new Function("i", b)
}, CellPattern.prototype.toJSON = function() {
    return [this.movementMask, this.cellMask, this.nonExistenceMask, this.moveNonExistenceMask, this.moveStationaryMask, this.randomDirOrEntityMask, this.movementsToRemove]
};
var _o1, _o2, _o2_5, _o3, _o4, _o5, _o6, _o7, _o8, _o9, _o10, _o11, _o12, _m1, _m2, _m3;
CellPattern.prototype.replace = function(a, b) {
    var c = this.replacement;
    if (c === null) return !1;
    var d = c.randomEntityMask,
        e = c.randomDirMask,
        f = c.objectsSet.cloneInto(_o1),
        g = c.objectsClear.cloneInto(_o2),
        h = c.movementsSet.cloneInto(_m1),
        i = c.movementsClear.cloneInto(_m2);
    i.ior(c.movementsLayerMask);
    if (!d.iszero()) {
        var j = [];
        for (var k = 0; k < 32 * STRIDE_OBJ; k++) d.get(k) && j.push(k);
        var l = j[Math.floor(RandomGen.uniform() * j.length)],
            m = state.idDict[l],
            n = state.objects[m];
        f.ibitset(l), g.ior(state.layerMasks[n.layer]), i.ishiftor(31, 5 * n.layer)
    }
    if (!e.iszero())
        for (var o = 0; o < level.layerCount; o++)
            if (e.get(5 * o)) {
                var p = Math.floor(RandomGen.uniform() * 4);
                h.ibitset(p + 5 * o)
            }
    var q = level.getCellInto(b, _o2_5),
        r = level.getMovements(b),
        s = q.cloneInto(_o3),
        t = r.cloneInto(_m3);
    q.iclear(g), q.ior(f), r.iclear(i), r.ior(h);
    var u = !1,
        v = 0,
        w = 0;
    if (a.isRigid) {
        var x = state.groupNumber_to_RigidGroupIndex[a.groupNumber];
        x++;
        var y = new BitVec(STRIDE_MOV);
        for (var z = 0; z < level.layerCount; z++) y.ishiftor(x, z * 5);
        y.iand(c.movementsLayerMask), v = level.rigidGroupIndexMask[b] || new BitVec(STRIDE_MOV), w = level.rigidMovementAppliedMask[b] || new BitVec(STRIDE_MOV);
        if (!y.bitsSetInArray(v.data) || !c.movementsLayerMask.bitsSetInArray(w.data)) v.ior(y), w.ior(c.movementsLayerMask), u = !0
    }
    var A = !1;
    if (!s.equals(q) || !t.equals(r) || u) {
        A = !0, u && (level.rigidGroupIndexMask[b] = v, level.rigidMovementAppliedMask[b] = w);
        var B = q.cloneInto(_o4);
        B.iclear(s), sfxCreateMask.ior(B);
        var C = s.cloneInto(_o5);
        C.iclear(q), sfxDestroyMask.ior(C), level.setCell(b, q), level.setMovements(b, r);
        var D = b / level.height | 0,
            E = b % level.height;
        level.colCellContents[D].ior(q), level.rowCellContents[E].ior(q), level.mapCellContents.ior(q)
    }
    return A
};
var rigidBackups = [];
Rule.prototype.findMatches = function() {
    var a = [],
        b = this.cellRowMasks;
    for (var c = 0; c < this.patterns.length; c++) {
        var d = this.patterns[c],
            e = this.cellRowMatches[c];
        if (this.isEllipsis[c]) var f = matchCellRowWildCard(this.direction, e, d, b[c]);
        else var f = matchCellRow(this.direction, e, d, b[c]);
        if (f.length === 0) return [];
        a.push(f)
    }
    return a
}, Rule.prototype.applyAt = function(a, b, c) {
    var d = this;
    if (c) {
        var e = !0;
        for (var f = 0; f < d.patterns.length; f++)
            if (d.isEllipsis[f]) {
                if (DoesCellRowMatchWildCard(d.direction, d.patterns[f], b[f][0], b[f][1] + 1, b[f][1]) === !1) {
                    e = !1;
                    break
                }
            } else if (DoesCellRowMatch(d.direction, d.patterns[f], b[f]) === !1) {
            e = !1;
            break
        }
        if (e === !1) return !1
    }
    var g = !1,
        h = a[0] * level.height,
        i = a[1];
    for (var f = 0; f < d.patterns.length; f++) {
        var j = d.patterns[f],
            k = d.isEllipsis[f] ? b[f][0] : b[f];
        for (var l = 0; l < j.length; l++) {
            var m = j[l];
            if (m === ellipsisPattern) {
                var n = b[f][1];
                k = (k + (i + h) * n) % level.n_tiles;
                continue
            }
            g = m.replace(d, k) || g, k = (k + i + h) % level.n_tiles
        }
    }
    if (verbose_logging && g) {
        var o = dirMaskName[d.direction],
            p = '<font color="green">Rule <a onclick="jumpToLine(' + d.lineNumber + ');" href="javascript:void(0);">' + d.lineNumber + "</a> " + o + " applied.</font>";
        consolePrint(p)
    }
    return g
}, Rule.prototype.tryApply = function() {
    var a = dirMasksDelta[this.direction],
        b = this.findMatches();
    if (b.length === 0) return !1;
    var c = !1;
    if (this.hasReplacements) {
        var d = generateTuples(b);
        for (var e = 0; e < d.length; e++) {
            var f = d[e],
                g = e > 0,
                h = this.applyAt(a, f, g);
            c = h || c
        }
    }
    return b.length > 0 && this.queueCommands(), c
}, Rule.prototype.queueCommands = function() {
    var a = this.commands;
    for (var b = 0; b < a.length; b++) {
        var c = a[b],
            d = !1;
        if (level.commandQueue.indexOf(c[0]) >= 0) continue;
        level.commandQueue.push(c[0]);
        if (verbose_logging) {
            var e = this.lineNumber,
                f = dirMaskName[this.direction],
                g = '<font color="green">Rule <a onclick="jumpToLine(' + e.toString() + ');" href="javascript:void(0);">' + e.toString() + "</a> triggers command " + c[0] + ".</font>";
            consolePrint(g)
        }
        c[0] === "message" && (messagetext = c[1])
    }
};
var sfxCreateMask = 0,
    sfxDestroyMask = 0

function logErrorCacheable(a, b, c) {
    if (compiling || c) {
        if (b === undefined) return logErrorNoLine(a);
        var d = '<a onclick="jumpToLine(' + b.toString() + ');" href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + b.toString() + "</span></a> : " + '<span class="errorText">' + a + "</span>";
        errorStrings.indexOf(d) >= 0 && !c || (consolePrint(d), errorStrings.push(d), errorCount++)
    }
}

function logError(a, b, c) {
    if (compiling || c) {
        if (b === undefined) return logErrorNoLine(a);
        var d = '<a onclick="jumpToLine(' + b.toString() + ');" href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + b.toString() + "</span></a> : " + '<span class="errorText">' + a + "</span>";
        errorStrings.indexOf(d) >= 0 && !c || (consolePrint(d, !0), errorStrings.push(d), errorCount++)
    }
}

function logWarning(a, b, c) {
    if (compiling || c) {
        if (b === undefined) return logErrorNoLine(a);
        var d = '<a onclick="jumpToLine(' + b.toString() + ');" href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + b.toString() + "</span></a> : " + '<span class="warningText">' + a + "</span>";
        errorStrings.indexOf(d) >= 0 && !c || (consolePrint(d, !0), errorStrings.push(d))
    }
}

function logErrorNoLine(a, b) {
    if (compiling || b) {
        var c = '<span class="errorText">' + a + "</span>";
        errorStrings.indexOf(c) >= 0 && !b || (consolePrint(c, !0), errorStrings.push(c)), errorCount++
    }
}

function logBetaMessage(a, b) {
    if (compiling || b) {
        var c = '<span class="betaText">' + a + "</span>";
        errorStrings.indexOf(c) >= 0 && !b || (consoleError(c), errorStrings.push(c))
    }
}

function blankLineHandle(a) {
    a.section === "levels" ? a.levels[a.levels.length - 1].length > 0 && a.levels.push([]) : a.section === "objects" && (a.objects_section = 0)
}
var compiling = !1,
    errorStrings = [],
    errorCount = 0,
    codeMirrorFn = function() {
        function a(a, b) {
            for (var c = 0; c < b.length; c++)
                if (b[c] === a) return c;
            return -1
        }

        function b(a) {
            for (var b = 0; b < a.length; b++)
                if (a.charAt(b) !== "." && a.charAt(b) !== "0") return !1;
            return !0
        }

        function c(a, b) {
            if (a.objects[b] !== undefined) return logError('Object "' + b.toUpperCase() + '" defined multiple times.', a.lineNumber), "ERROR";
            for (var c = 0; c < a.legend_synonyms.length; c++) {
                var d = a.legend_synonyms[c];
                d[0] == b && logError('Name "' + b.toUpperCase() + '" already in use.', a.lineNumber)
            }
            for (var c = 0; c < a.legend_aggregates.length; c++) {
                var d = a.legend_aggregates[c];
                d[0] == b && logError('Name "' + b.toUpperCase() + '" already in use.', a.lineNumber)
            }
            for (var c = 0; c < a.legend_properties.length; c++) {
                var d = a.legend_properties[c];
                d[0] == b && logError('Name "' + b.toUpperCase() + '" already in use.', a.lineNumber)
            }
        }
        "use strict";
        var d = ["up", "down", "right", "left"],
            e = ["^", "v", "<", ">", "moving", "stationary", "parallel", "perpendicular", "no"],
            f = ["all", "no", "on", "some"],
            g = ["objects", "legend", "sounds", "collisionlayers", "rules", "winconditions", "levels"],
            h = ["sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"],
            i = /\s*(sfx0|sfx1|sfx2|sfx3|Sfx4|sfx5|sfx6|sfx7|sfx8|sfx9|sfx10|cancel|checkpoint|restart|win|message|again)\s*/,
            j = /[\w]+\s*/,
            k = /[\d]+/,
            l = /\d+\b/,
            m = /[\.0-9]{5}\s*/,
            n = /(objects|collisionlayers|legend|sounds|rules|winconditions|levels)\s*/,
            o = /[\=]+/,
            p = /[^\(]+/,
            q = /[ \,]*/,
            r = /(move|action|create|destroy|cantmove|undo|restart|titlescreen|startgame|endgame|startlevel|endlevel|showmessage|closemessage|sfx0|sfx1|sfx2|sfx3|sfx4|sfx5|sfx6|sfx7|sfx8|sfx9|sfx10)\s+/,
            s = /^(action|up|down|left|right|\^|v|\<|\>|forward|moving|stationary|parallel|perpendicular|horizontal|orthogonal|vertical|no|randomdir|random)$/,
            t = /^(startloop|endloop)$/,
            u = /^(up|down|left|right|horizontal|vertical|orthogonal|late|rigid)$/,
            v = /\s*(up|down|left|right|horizontal|vertical|orthogonal)\s*/,
            w = /^(all|any|no|some)$/,
            x = /(objects|collisionlayers|legend|sounds|rules|winconditions|\.\.\.|levels|up|down|left|right|^|v|\>|\<|no|horizontal|orthogonal|vertical|any|all|no|some|moving|stationary|parallel|perpendicular|action)/,
            y = ["objects", "collisionlayers", "legend", "sounds", "rules", "...", "winconditions", "levels", "up", "down", "left", "right", "late", "rigid", "^", "v", ">", "<", "no", "randomdir", "random", "horizontal", "vertical", "any", "all", "no", "some", "moving", "stationary", "parallel", "perpendicular", "action"],
            z = ["00000", "00000", "00000", "00000", "00000"];
        return {
            copyState: function(a) {
                var b = {};
                for (var c in a.objects)
                    if (a.objects.hasOwnProperty(c)) {
                        var d = a.objects[c];
                        b[c] = {
                            colors: d.colors.concat([]),
                            lineNumber: d.lineNumber,
                            spritematrix: d.spritematrix.concat([])
                        }
                    }
                var e = [];
                for (var c = 0; c < a.collisionLayers.length; c++) e.push(a.collisionLayers[c].concat([]));
                var f = [],
                    g = [],
                    h = [],
                    i = [],
                    j = [],
                    k = [];
                for (var c = 0; c < a.legend_synonyms.length; c++) f.push(a.legend_synonyms[c].concat([]));
                for (var c = 0; c < a.legend_aggregates.length; c++) g.push(a.legend_aggregates[c].concat([]));
                for (var c = 0; c < a.legend_properties.length; c++) h.push(a.legend_properties[c].concat([]));
                for (var c = 0; c < a.sounds.length; c++) i.push(a.sounds[c].concat([]));
                for (var c = 0; c < a.levels.length; c++) j.push(a.levels[c].concat([]));
                for (var c = 0; c < a.winconditions.length; c++) k.push(a.winconditions[c].concat([]));
                var l = {
                    lineNumber: a.lineNumber,
                    objects: b,
                    collisionLayers: e,
                    commentLevel: a.commentLevel,
                    section: a.section,
                    visitedSections: a.visitedSections.concat([]),
                    objects_candname: a.objects_candname,
                    objects_section: a.objects_section,
                    objects_spritematrix: a.objects_spritematrix.concat([]),
                    tokenIndex: a.tokenIndex,
                    legend_synonyms: f,
                    legend_aggregates: g,
                    legend_properties: h,
                    sounds: i,
                    rules: a.rules.concat([]),
                    names: a.names.concat([]),
                    winconditions: k,
                    abbrevNames: a.abbrevNames.concat([]),
                    metadata: a.metadata.concat([]),
                    levels: j,
                    STRIDE_OBJ: a.STRIDE_OBJ,
                    STRIDE_MOV: a.STRIDE_MOV
                };
                return l
            },
            blankLine: function(a) {
                a.section === "levels" && a.levels[a.levels.length - 1].length > 0 && a.levels.push([])
            },
            token: function(a, b) {
                var d = a.string,
                    e = a.sol();
                e && (a.string = a.string.toLowerCase(), b.tokenIndex = 0), a.eatWhile(/[ \t]/);
                var f = a.peek();
                if (f === "(" && b.tokenIndex !== -4) a.next(), b.commentLevel++;
                else if (f === ")") {
                    a.next();
                    if (b.commentLevel > 0) {
                        b.commentLevel--;
                        if (b.commentLevel === 0) return "comment"
                    }
                }
                if (b.commentLevel > 0) {
                    for (;;) {
                        a.eatWhile(/[^\(\)]+/);
                        if (a.eol()) break;
                        f = a.peek(), f === "(" ? b.commentLevel++ : f === ")" && b.commentLevel--, a.next();
                        if (b.commentLevel === 0) break
                    }
                    return "comment"
                }
                a.eatWhile(/[ \t]/);
                if (e && a.eol()) return blankLineHandle(b);
                if (e && a.match(o, !0)) return "EQUALSBIT";
                if (a.match(n, !0)) {
                    b.section = a.string.slice(0, a.pos).trim(), b.visitedSections.indexOf(b.section) >= 0 && logError('cannot duplicate sections (you tried to duplicate "' + b.section.toUpperCase() + '").', b.lineNumber), b.visitedSections.push(b.section);
                    var i = g.indexOf(b.section);
                    i == 0 ? (b.objects_section = 0, b.visitedSections.length > 1 && logError('section "' + b.section.toUpperCase() + '" must be the first section', b.lineNumber)) : b.visitedSections.indexOf(g[i - 1]) == -1 && (i === -1 ? logError('no such section as "' + b.section.toUpperCase() + '".', b.lineNumber) : logError('section "' + b.section.toUpperCase() + '" is out of order, must follow "' + g[i - 1].toUpperCase() + '".', b.lineNumber));
                    if (b.section === "sounds") {
                        for (var k in b.objects) b.objects.hasOwnProperty(k) && b.names.push(k);
                        for (var m = 0; m < b.legend_synonyms.length; m++) {
                            var k = b.legend_synonyms[m][0];
                            b.names.push(k)
                        }
                        for (var m = 0; m < b.legend_aggregates.length; m++) {
                            var k = b.legend_aggregates[m][0];
                            b.names.push(k)
                        }
                        for (var m = 0; m < b.legend_properties.length; m++) {
                            var k = b.legend_properties[m][0];
                            b.names.push(k)
                        }
                    } else if (b.section === "levels") {
                        for (var k in b.objects) b.objects.hasOwnProperty(k) && k.length == 1 && b.abbrevNames.push(k);
                        for (var m = 0; m < b.legend_synonyms.length; m++) b.legend_synonyms[m][0].length == 1 && b.abbrevNames.push(b.legend_synonyms[m][0]);
                        for (var m = 0; m < b.legend_aggregates.length; m++) b.legend_aggregates[m][0].length == 1 && b.abbrevNames.push(b.legend_aggregates[m][0])
                    }
                    return "HEADER"
                }
                b.section === undefined && logError('must start with section "OBJECTS"', b.lineNumber);
                if (a.eol()) return null;
                switch (b.section) {
                    case "objects":
                        var x = function() {
                            var c = e ? a.match(j, !0) : a.match(/[^\s\()]+\s*/, !0);
                            if (c == null) return a.match(p, !0), "ERROR";
                            var d = c[0].trim();
                            if (b.objects[d] !== undefined) return logError('Object "' + d.toUpperCase() + '" defined multiple times.', b.lineNumber), "ERROR";
                            for (var f = 0; f < b.legend_synonyms.length; f++) {
                                var g = b.legend_synonyms[f];
                                g[0] == d && logError('Name "' + d.toUpperCase() + '" already in use.', b.lineNumber)
                            }
                            return y.indexOf(d) >= 0 && logWarning('You named an object "' + d.toUpperCase() + "\", but this is a keyword. Don't do that!", b.lineNumber), e ? (b.objects_candname = d, b.objects[b.objects_candname] = {
                                lineNumber: b.lineNumber,
                                colors: [],
                                spritematrix: []
                            }) : b.legend_synonyms.push([d, b.objects_candname, b.lineNumber]), b.objects_section = 1, "NAME"
                        };
                        e && b.objects_section == 2 && (b.objects_section = 3), e && b.objects_section == 1 && (b.objects_section = 2);
                        switch (b.objects_section) {
                            case 0:
                            case 1:
                                return b.objects_spritematrix = [], x();
                            case 2:
                                b.tokenIndex = 0;
                                var z = a.match(reg_color, !0);
                                if (z == null) {
                                    var A = a.match(j, !0) || a.match(p, !0);
                                    return logError("Was looking for color for object " + b.objects_candname.toUpperCase() + ', got "' + A + '" instead.', b.lineNumber), null
                                }
                                b.objects[b.objects_candname].colors === undefined ? b.objects[b.objects_candname].colors = [z[0].trim()] : b.objects[b.objects_candname].colors.push(z[0].trim());
                                var B = z[0].trim().toLowerCase();
                                return B in colorPalettes.arnecolors ? "COLOR COLOR-" + B.toUpperCase() : B === "transparent" ? "COLOR FADECOLOR" : "COLOR";
                            case 3:
                                var f = a.eat(/[.\d]/),
                                    C = b.objects_spritematrix;
                                if (f === undefined) return C.length === 0 ? x() : (logError("Unknown junk in spritematrix for object " + b.objects_candname.toUpperCase() + ".", b.lineNumber), a.match(p, !0), null);
                                e && C.push("");
                                var D = b.objects[b.objects_candname];
                                C[C.length - 1] += f, C.length === 5 && C[C.length - 1].length == 5 && (D.spritematrix = b.objects_spritematrix, b.objects_section = 0);
                                if (f !== ".") {
                                    var k = parseInt(f);
                                    return k >= D.colors.length ? (logError("trying to access color number " + k + " from the color palette of sprite " + b.objects_candname.toUpperCase() + ", but there are only " + D.colors.length + " defined in it.", b.lineNumber), "ERROR") : isNaN(k) ? (logError('invalid character "' + f + '" in sprite for ' + b.objects_candname.toUpperCase(), b.lineNumber), "ERROR") : "COLOR BOLDCOLOR COLOR-" + D.colors[k].toUpperCase()
                                }
                                return "COLOR FADECOLOR";
                            default:
                                window.console.logError("EEK shouldn't get here.")
                        }
                        break;
                    case "sounds":
                        if (e) {
                            var E = !0,
                                F = p.exec(a.string)[0].split(/\s/).filter(function(a) {
                                    return a !== ""
                                });
                            F.push(b.lineNumber), b.sounds.push(F)
                        }
                        J = a.match(r, !0);
                        if (J !== null) return "SOUNDVERB";
                        J = a.match(v, !0);
                        if (J !== null) return "DIRECTION";
                        J = a.match(l, !0);
                        if (J !== null) return b.tokenIndex++, "SOUND";
                        J = a.match(/[^\[\|\]\s]*/, !0);
                        if (J !== null) {
                            var G = J[0].trim();
                            if (b.names.indexOf(G) >= 0) return "NAME"
                        }
                        return J = a.match(p, !0), logError('unexpected sound token "' + J + '".', b.lineNumber), a.match(p, !0), "ERROR";
                    case "collisionlayers":
                        e && (b.collisionLayers.push([]), b.tokenIndex = 0);
                        var H = a.match(j, !0);
                        if (H === null) {
                            var I = a.pos;
                            return a.match(q, !0), a.pos == I && (logError("error detected - unexpected character " + a.peek(), b.lineNumber), a.next()), null
                        }
                        var J = H[0].trim(),
                            K = function(a) {
                                a = a.toLowerCase();
                                if (a in b.objects) return [a];
                                for (var c = 0; c < b.legend_synonyms.length; c++) {
                                    var d = b.legend_synonyms[c];
                                    if (d[0] === a) return [d[1]]
                                }
                                for (var c = 0; c < b.legend_aggregates.length; c++) {
                                    var d = b.legend_aggregates[c];
                                    if (d[0] === a) return logError('"' + a + '" is an aggregate (defined using "and"), and cannot be added to a single layer because its constituent objects must be able to coexist.', b.lineNumber), []
                                }
                                for (var c = 0; c < b.legend_properties.length; c++) {
                                    var d = b.legend_properties[c];
                                    if (d[0] === a) {
                                        var e = [].concat.apply([], d.slice(1).map(K));
                                        return e
                                    }
                                }
                                return logError('Cannot add "' + J.toUpperCase() + '" to a collision layer; it has not been declared.', b.lineNumber), []
                            };
                        J === "background" ? (b.collisionLayers.length > 0 && b.collisionLayers[b.collisionLayers.length - 1].length > 0 && logError("Background must be in a layer by itself.", b.lineNumber), b.tokenIndex = 1) : b.tokenIndex !== 0 && logError("Background must be in a layer by itself.", b.lineNumber);
                        var L = K(J);
                        return b.collisionLayers.length === 0 ? (logError("no layers found.", b.lineNumber), "ERROR") : (b.collisionLayers[b.collisionLayers.length - 1] = b.collisionLayers[b.collisionLayers.length - 1].concat(L), L.length > 0 ? "NAME" : "ERROR");
                    case "legend":
                        if (e) {
                            var M = a.string.replace("=", " = ");
                            M = p.exec(M)[0];
                            var F = M.split(/\s/).filter(function(a) {
                                    return a !== ""
                                }),
                                E = !0;
                            if (F.length > 0) {
                                var J = F[0].toLowerCase();
                                y.indexOf(J) >= 0 && logWarning('You named an object "' + J.toUpperCase() + "\", but this is a keyword. Don't do that!", b.lineNumber), F.indexOf(J, 2) >= 2 && logError("You can't define object " + J.toUpperCase() + " in terms of itself!", b.lineNumber), c(b, J)
                            }
                            if (F.length < 3) E = !1;
                            else if (F[1] !== "=") E = !1;
                            else if (F.length === 3) b.legend_synonyms.push([F[0], F[2].toLowerCase(), b.lineNumber]);
                            else if (F.length % 2 === 0) E = !1;
                            else {
                                var N = F[3].toLowerCase();
                                if (N === "and") {
                                    var K = function(a) {
                                        a = a.toLowerCase();
                                        if (a in b.objects) return [a];
                                        for (var c = 0; c < b.legend_synonyms.length; c++) {
                                            var d = b.legend_synonyms[c];
                                            if (d[0] === a) return [1]
                                        }
                                        for (var c = 0; c < b.legend_aggregates.length; c++) {
                                            var d = b.legend_aggregates[c];
                                            if (d[0] === a) return [].concat.apply([], d.slice(1).map(K))
                                        }
                                        for (var c = 0; c < b.legend_properties.length; c++) {
                                            var d = b.legend_properties[c];
                                            if (d[0] === a) return logError("Cannot define an aggregate (using 'and') in terms of properties (something that uses 'or').", b.lineNumber), E = !1, [a]
                                        }
                                        return [a]
                                    };
                                    for (var m = 5; m < F.length; m += 2)
                                        if (F[m].toLowerCase() !== "and") {
                                            E = !1;
                                            break
                                        }
                                    if (E) {
                                        var O = [F[0]].concat(K(F[2])).concat(K(F[4]));
                                        for (var m = 6; m < F.length; m += 2) O = O.concat(K(F[m]));
                                        O.lineNumber = b.lineNumber, b.legend_aggregates.push(O)
                                    }
                                } else if (N === "or") {
                                    var K = function(a) {
                                        a = a.toLowerCase();
                                        if (a in b.objects) return [a];
                                        for (var c = 0; c < b.legend_synonyms.length; c++) {
                                            var d = b.legend_synonyms[c];
                                            if (d[0] === a) return [1]
                                        }
                                        for (var c = 0; c < b.legend_aggregates.length; c++) {
                                            var d = b.legend_aggregates[c];
                                            d[0] === a && (logError("Cannot define a property (using 'or') in terms of aggregates (something that uses 'and').", b.lineNumber), E = !1)
                                        }
                                        for (var c = 0; c < b.legend_properties.length; c++) {
                                            var d = b.legend_properties[c];
                                            if (d[0] === a) return [].concat.apply([], d.slice(1).map(K))
                                        }
                                        return [a]
                                    };
                                    for (var m = 5; m < F.length; m += 2)
                                        if (F[m].toLowerCase() !== "or") {
                                            E = !1;
                                            break
                                        }
                                    if (E) {
                                        var O = [F[0], F[2].toLowerCase(), F[4].toLowerCase()];
                                        for (var m = 6; m < F.length; m += 2) O.push(F[m].toLowerCase());
                                        O.lineNumber = b.lineNumber, b.legend_properties.push(O)
                                    }
                                } else E = !1
                            }
                            if (E === !1) return logError("incorrect format of legend - should be one of A = B, A = B or C ( or D ...), A = B and C (and D ...)", b.lineNumber), a.match(p, !0), "ERROR";
                            b.tokenIndex = 0
                        }
                        if (b.tokenIndex === 0) return a.match(/[^=]*/, !0), b.tokenIndex++, "NAME";
                        if (b.tokenIndex === 1) return a.next(), a.match(/\s*/, !0), b.tokenIndex++, "ASSSIGNMENT";
                        var H = a.match(j, !0);
                        if (H === null) return logError("Something bad's happening in the LEGEND", b.lineNumber), a.match(p, !0), "ERROR";
                        var J = H[0].trim();
                        if (b.tokenIndex % 2 === 0) {
                            var P = function(a) {
                                a = a.toLowerCase();
                                if (a in b.objects) return !0;
                                for (var c = 0; c < b.legend_aggregates.length; c++) {
                                    var d = b.legend_aggregates[c];
                                    if (d[0] === a) return !0
                                }
                                for (var c = 0; c < b.legend_properties.length; c++) {
                                    var d = b.legend_properties[c];
                                    if (d[0] === a) return !0
                                }
                                for (var c = 0; c < b.legend_synonyms.length; c++) {
                                    var d = b.legend_synonyms[c];
                                    if (d[0] === a) return !0
                                }
                                return !1
                            };
                            return P(J) === !1 ? (logError('Cannot reference "' + J.toUpperCase() + '" in the LEGEND section; it has not been defined yet.', b.lineNumber), b.tokenIndex++, "ERROR") : (b.tokenIndex++, "NAME")
                        }
                        return b.tokenIndex++, "LOGICWORD";
                    case "rules":
                        if (e) {
                            var Q = p.exec(a.string)[0];
                            b.rules.push([Q, b.lineNumber, d]), b.tokenIndex = 0
                        }
                        if (b.tokenIndex === -4) return a.skipToEnd(), "MESSAGE";
                        if (a.match(/\s*\-\>\s*/, !0)) return "ARROW";
                        if (f === "[" || f === "|" || f === "]" || f === "+") return f !== "+" && (b.tokenIndex = 1), a.next(), a.match(/\s*/, !0), "BRACKET";
                        var G = a.match(/[^\[\|\]\s]*/, !0)[0].trim();
                        return b.tokenIndex === 0 && t.exec(G) ? "BRACKET" : b.tokenIndex === 0 && u.exec(G) ? (a.match(/\s*/, !0), "DIRECTION") : b.tokenIndex === 1 && s.exec(G) ? (a.match(/\s*/, !0), "DIRECTION") : b.names.indexOf(G) >= 0 ? e ? (logError("Identifiers cannot appear outside of square brackes in rules, only directions can.", b.lineNumber), "ERROR") : (a.match(/\s*/, !0), "NAME") : G === "..." ? "DIRECTION" : G === "rigid" ? "DIRECTION" : G === "random" ? "DIRECTION" : h.indexOf(G) >= 0 ? (G === "message" && (b.tokenIndex = -4), "COMMAND") : (logError('Name "' + G + '", referred to in a rule, does not exist.', b.lineNumber), "ERROR");
                    case "winconditions":
                        if (e) {
                            var R = p.exec(a.string),
                                S = R[0].split(/\s/),
                                T = S.filter(function(a) {
                                    return a !== ""
                                });
                            T.push(b.lineNumber), b.winconditions.push(T), b.tokenIndex = -1
                        }
                        b.tokenIndex++;
                        var U = a.match(/\s*\w+\s*/);
                        if (U === null) return logError("incorrect format of win condition.", b.lineNumber), a.match(p, !0), "ERROR";
                        var V = U[0].trim();
                        if (b.tokenIndex === 0) return w.exec(V) ? "LOGICWORD" : "ERROR";
                        if (b.tokenIndex === 2) return V != "on" ? "ERROR" : "LOGICWORD";
                        if (b.tokenIndex === 1 || b.tokenIndex === 3) return b.names.indexOf(V) === -1 ? (logError('Error in win condition: "' + V.toUpperCase() + '" is not a valid object name.', b.lineNumber), "ERROR") : "NAME";
                        break;
                    case "levels":
                        if (e) {
                            if (a.match(/\s*message\s*/, !0)) {
                                b.tokenIndex = 1;
                                var W = ["\n", d.slice(a.pos).trim()];
                                return b.levels[b.levels.length - 1].length == 0 ? b.levels.splice(b.levels.length - 1, 0, W) : b.levels.push(W), "MESSAGE_VERB"
                            }
                            var X = a.match(p, !1)[0].trim();
                            b.tokenIndex = 2;
                            var Y = b.levels[b.levels.length - 1];
                            Y[0] == "\n" ? b.levels.push([b.lineNumber, X]) : (Y.length == 0 && Y.push(b.lineNumber), Y.push(X))
                        } else if (b.tokenIndex == 1) return a.skipToEnd(), "MESSAGE";
                        if (b.tokenIndex === 2 && !a.eol()) {
                            var f = a.peek();
                            return a.next(), b.abbrevNames.indexOf(f) >= 0 ? "LEVEL" : (logError('Key "' + f.toUpperCase() + '" not found. Do you need to add it to the legend, or define a new object?', b.lineNumber), "ERROR")
                        }
                        break;
                    default:
                        e && (b.tokenIndex = 0);
                        if (b.tokenIndex != 0) return a.match(p, !0), "METADATATEXT";
                        var U = a.match(/\s*\w+\s*/);
                        if (U !== null) {
                            var Z = U[0].trim();
                            if (e) {
                                if (["title", "author", "homepage", "background_color", "text_color", "key_repeat_interval", "realtime_interval", "again_interval", "flickscreen", "zoomscreen", "color_palette", "youtube"].indexOf(Z) >= 0) {
                                    if (Z === "youtube" || Z === "author" || Z === "title") a.string = d;
                                    var $ = a.match(p, !1);
                                    return $ != null ? (b.metadata.push(Z), b.metadata.push($[0].trim())) : logError('MetaData "' + Z + '" needs a value.', b.lineNumber), b.tokenIndex = 1, "METADATA"
                                }
                                return ["run_rules_on_level_start", "norepeat_action", "require_player_movement", "debug", "verbose_logging", "throttle_movement", "noundo", "noaction", "norestart", "scanline"].indexOf(Z) >= 0 ? (b.metadata.push(Z), b.metadata.push("true"), b.tokenIndex = -1, "METADATA") : (logError("Unrecognised stuff in metadata section.", b.lineNumber), "ERROR")
                            }
                            return b.tokenIndex == -1 ? (logError('MetaData "' + Z + '" has no parameters.', b.lineNumber), "ERROR") : "METADATA"
                        }
                }
                if (a.eol()) return null;
                if (!a.eol()) return a.next(), null
            },
            startState: function() {
                return {
                    objects: {},
                    lineNumber: 0,
                    commentLevel: 0,
                    section: "",
                    visitedSections: [],
                    objects_candname: "",
                    objects_section: 0,
                    objects_spritematrix: [],
                    collisionLayers: [],
                    tokenIndex: 0,
                    legend_synonyms: [],
                    legend_aggregates: [],
                    legend_properties: [],
                    sounds: [],
                    rules: [],
                    names: [],
                    winconditions: [],
                    metadata: [],
                    abbrevNames: [],
                    levels: [
                        []
                    ],
                    subsection: ""
                }
            }
        }
    };
window.CodeMirror.defineMode("puzzle", codeMirrorFn)

function isColor(a) {
    return a = a.trim(), a in colorPalettes.arnecolors ? !0 : /^#([0-9A-F]{3}){1,2}$/i.test(a) ? !0 : a === "transparent" ? !0 : !1
}

function colorToHex(a, b) {
    return b = b.trim(), b in a ? a[b] : b
}

function generateSpriteMatrix(a) {
    var b = [];
    for (var c = 0; c < a.length; c++) {
        var d = [];
        for (var e = 0; e < a.length; e++) {
            var f = a[c].charAt(e);
            f == "." ? d.push(-1) : d.push(f)
        }
        b.push(d)
    }
    return b
}

function generateExtraMembers(a) {
    a.collisionLayers.length === 0 && logError("No collision layers defined. All objects need to be in collision layers."), a.idDict = {};
    var b = 0;
    for (var c = 0; c < a.collisionLayers.length; c++)
        for (var d = 0; d < a.collisionLayers[c].length; d++) {
            var e = a.collisionLayers[c][d];
            if (e in a.objects) {
                var f = a.objects[e];
                f.layer = c, f.id = b, a.idDict[b] = e, b++
            }
        }
    a.objectCount = b;
    var g = a.collisionLayers.length,
        h = [];
    for (var i = 0; i < g; i++) h.push(-1);
    STRIDE_OBJ = Math.ceil(a.objectCount / 32) | 0, STRIDE_MOV = Math.ceil(g / 5) | 0, a.STRIDE_OBJ = STRIDE_OBJ, a.STRIDE_MOV = STRIDE_MOV, debugMode = !1, verbose_logging = !1, throttle_movement = !1, colorPalette = colorPalettes.arnecolors;
    for (var i = 0; i < a.metadata.length; i += 2) {
        var j = a.metadata[i],
            k = a.metadata[i + 1];
        j === "color_palette" ? (k in colorPalettesAliases && (k = colorPalettesAliases[k]), colorPalettes[k] === undefined ? logError('Palette "' + k + '" not found, defaulting to arnecolors.', 0) : colorPalette = colorPalettes[k]) : j === "debug" ? (debugMode = !0, cache_console_messages = !0) : j === "verbose_logging" ? (verbose_logging = !0, cache_console_messages = !0) : j === "throttle_movement" && (throttle_movement = !0)
    }
    for (var e in a.objects)
        if (a.objects.hasOwnProperty(e)) {
            var f = a.objects[e];
            f.colors.length > 10 && logError("a sprite cannot have more than 10 colors. Why you would want more than 10 is beyond me.", f.lineNumber + 1);
            for (var i = 0; i < f.colors.length; i++) {
                var l = f.colors[i];
                isColor(l) ? (l = colorToHex(colorPalette, l), f.colors[i] = l) : (logError('Invalid color specified for object "' + e + '", namely "' + f.colors[i] + '".', f.lineNumber + 1), f.colors[i] = "#ff00ff")
            }
        }
    for (var e in a.objects)
        if (a.objects.hasOwnProperty(e)) {
            var f = a.objects[e];
            f.colors.length == 0 && (logError('color not specified for object "' + e + '".', f.lineNumber), f.colors = ["#ff00ff"]), f.spritematrix.length === 0 ? f.spritematrix = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ] : f.spritematrix = generateSpriteMatrix(f.spritematrix)
        }
    var m = {};
    for (var e in a.objects)
        if (a.objects.hasOwnProperty(e)) {
            var f = a.objects[e],
                n = h.concat([]);
            n[f.layer] = f.id, m[e] = n
        }
    var o = !0;
    while (o) {
        o = !1;
        for (var i = 0; i < a.legend_synonyms.length; i++) {
            var p = a.legend_synonyms[i],
                j = p[0],
                k = p[1];
            (!(j in m) || m[j] === undefined) && m[k] !== undefined && (o = !0, m[j] = m[k])
        }
        for (var i = 0; i < a.legend_aggregates.length; i++) {
            var p = a.legend_aggregates[i],
                j = p[0],
                q = p.slice(1),
                r = !0;
            for (var d = 0; d < q.length; d++) {
                var s = q[d];
                if (m[s] === undefined) {
                    r = !1;
                    break
                }
            }
            if ((!(j in m) || m[j] === undefined) && r) {
                var n = h.concat([]);
                for (var d = 1; d < p.length; d++) {
                    var e = p[d],
                        f = a.objects[e];
                    f == undefined && logError("Object not found with name " + e, a.lineNumber), n[f.layer] == -1 ? n[f.layer] = f.id : f.layer === undefined ? logError('Object "' + e.toUpperCase() + '" has been defined, but not assigned to a layer.', p.lineNumber) : logError('Trying to create an aggregate object (defined in the legend) with both "' + e.toUpperCase() + '" and "' + a.idDict[n[f.layer]].toUpperCase() + "\", which are on the same layer and therefore can't coexist.", p.lineNumber)
                }
                o = !0, m[p[0]] = n
            }
        }
    }
    a.glyphDict = m;
    var t = {};
    for (var i = 0; i < a.legend_aggregates.length; i++) {
        var u = a.legend_aggregates[i];
        t[u[0]] = u.slice(1)
    }
    a.aggregatesDict = t;
    var v = {};
    for (var i = 0; i < a.legend_properties.length; i++) {
        var u = a.legend_properties[i];
        v[u[0]] = u.slice(1)
    }
    a.propertiesDict = v;
    var w = {};
    for (var i = 0; i < a.legend_synonyms.length; i++) {
        var u = a.legend_synonyms[i],
            j = u[0],
            x = u[1];
        x in t ? t[j] = t[x] : x in v ? v[j] = v[x] : j !== x && (w[j] = x)
    }
    a.synonymsDict = w;
    var y = !0;
    while (y) {
        y = !1;
        for (var e in w)
            if (w.hasOwnProperty(e)) {
                var x = w[e];
                x in v ? (delete w[e], v[e] = v[x], y = !0) : x in t ? (delete t[e], t[e] = t[x], y = !0) : x in w && (w[e] = w[x])
            }
        for (var e in v)
            if (v.hasOwnProperty(e)) {
                var z = v[e];
                for (var i = 0; i < z.length; i++) {
                    var x = z[i];
                    if (x in w) z[i] = w[x], y = !0;
                    else if (x in v) {
                        z.splice(i, 1);
                        var A = v[x];
                        for (var d = 0; d < A.length; d++) {
                            var B = A[d];
                            z.indexOf(B) === -1 && z.push(B)
                        }
                        y = !0
                    }
                    x in t && logError('Trying to define property "' + e.toUpperCase() + '" in terms of aggregate "' + x.toUpperCase() + '".')
                }
            }
        for (var e in t)
            if (t.hasOwnProperty(e)) {
                var z = t[e];
                for (var i = 0; i < z.length; i++) {
                    var x = z[i];
                    if (x in w) z[i] = w[x], y = !0;
                    else if (x in t) {
                        z.splice(i, 1);
                        var A = t[x];
                        for (var d = 0; d < A.length; d++) {
                            var B = A[d];
                            z.indexOf(B) === -1 && z.push(B)
                        }
                        y = !0
                    }
                    x in v && logError('Trying to define aggregate "' + e.toUpperCase() + '" in terms of property "' + x.toUpperCase() + '".')
                }
            }
    }
    a.propertiesSingleLayer = {};
    for (var j in v)
        if (v.hasOwnProperty(j)) {
            var z = v[j],
                C = !0;
            for (var i = 1; i < z.length; i++)
                if (a.objects[z[i - 1]].layer !== a.objects[z[i]].layer) {
                    C = !1;
                    break
                }
            C && (a.propertiesSingleLayer[j] = a.objects[z[0]].layer)
        }
    a.idDict[0] === undefined && a.collisionLayers.length > 0 && logError("You need to have some objects defined");
    var D, E;
    if (a.objects.background === undefined)
        if ("background" in a.synonymsDict) {
            var e = a.synonymsDict.background,
                f = a.objects[e];
            D = f.id, E = f.layer
        } else if ("background" in a.propertiesDict) {
        var e = a.propertiesDict.background[0],
            f = a.objects[e];
        D = f.id, E = f.layer
    } else if ("background" in a.aggregatesDict) {
        var f = a.idDict[0];
        D = f.id, E = f.layer, logError("background cannot be an aggregate (declared with 'and'), it has to be a simple type, or property (declared in terms of others using 'or').")
    } else {
        var f = a.idDict[0];
        D = f.id, E = f.layer, logError("you have to define something to be the background")
    } else D = a.objects.background.id, E = a.objects.background.layer;
    a.backgroundid = D, a.backgroundlayer = E
}

function levelFromString(a, b) {
    var c = a.backgroundlayer,
        d = a.backgroundid,
        e = a.layerMasks[c],
        f = new Level(b[0], b[1].length, b.length - 1, a.collisionLayers.length, null);
    f.objects = new Int32Array(f.width * f.height * STRIDE_OBJ);
    for (var g = 0; g < f.width; g++)
        for (var h = 0; h < f.height; h++) {
            var i = b[h + 1].charAt(g);
            i.length == 0 && (i = b[h + 1].charAt(b[h + 1].length - 1));
            var j = a.glyphDict[i];
            j == undefined && (a.propertiesDict[i] === undefined ? logError('Error, symbol "' + i + '", used in map, not found.', b[0] + h) : logError('Error, symbol "' + i + "\" is defined using 'or', and therefore ambiguous - it cannot be used in a map. Did you mean to define it in terms of 'and'?", b[0] + h));
            var k = new BitVec(STRIDE_OBJ);
            j = j.concat([]);
            for (var l = 0; l < f.layerCount; l++) j[l] >= 0 && k.ibitset(j[l]);
            for (var m = 0; m < STRIDE_OBJ; ++m) f.objects[STRIDE_OBJ * (g * f.height + h) + m] = k.data[m]
        }
    var n = f.calcBackgroundMask(a);
    for (var g = 0; g < f.n_tiles; g++) {
        var o = f.getCell(g);
        e.anyBitsInCommon(o) || o.ior(n), f.setCell(g, o)
    }
    return f
}

function levelsToArray(a) {
    var b = a.levels,
        c = [];
    for (var d = 0; d < b.length; d++) {
        var e = b[d];
        if (e.length == 0) continue;
        if (e[0] == "\n") {
            var f = {
                message: e[1]
            };
            c.push(f)
        } else {
            var f = levelFromString(a, e);
            c.push(f)
        }
    }
    a.levels = c
}

function directionalRule(a) {
    for (var b = 0; b < a.lhs.length; b++) {
        var c = a.lhs[b];
        if (c.length > 1) return !0;
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            for (var f = 0; f < e.length; f += 2)
                if (relativeDirections.indexOf(e[f]) >= 0) return !0
        }
    }
    for (var b = 0; b < a.rhs.length; b++) {
        var c = a.rhs[b];
        if (c.length > 1) return !0;
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            for (var f = 0; f < e.length; f += 2)
                if (relativeDirections.indexOf(e[f]) >= 0) return !0
        }
    }
    return !1
}

function processRuleString(a, b, c) {
    var d = a[0],
        e = a[1],
        f = a[2];
    d = d.replace(/\[/g, " [ ").replace(/\]/g, " ] ").replace(/\|/g, " | ").replace(/\-\>/g, " -> ");
    var g = d.split(/\s/).filter(function(a) {
        return a !== ""
    });
    g.length == 0 && logError("Spooky error! Empty line passed to rule function.", e);
    var h = 0,
        i = [],
        j = null,
        k = [],
        l = !1,
        m = !1,
        n = [],
        o = [],
        p = !1,
        q = !1,
        r = e,
        s = [],
        t = !1;
    if (g.length === 1) {
        if (g[0] === "startloop") return x = {
            bracket: 1
        }, x;
        if (g[0] === "endloop") return x = {
            bracket: -1
        }, x
    }
    g.indexOf("->") == -1 && logError("A rule has to have an arrow in it. There's no arrow here! Consider reading up about rules - you're clearly doing something weird", e);
    for (var u = 0; u < g.length; u++) {
        var v = g[u];
        switch (h) {
            case 0:
                v === "+" ? r === e ? (c.length == 0 && logError('The "+" symbol, for joining a rule with the group of the previous rule, needs a previous rule to be applied to.'), u !== 0 && logError('The "+" symbol, for joining a rule with the group of the previous rule, must be the first symbol on the line '), r = c[c.length - 1].groupNumber) : logError('Two "+"s ("append to previous rule group" symbol)applied to the same rule.', e) : v in directionaggregates ? i = i.concat(directionaggregates[v]) : v === "late" ? p = !0 : v === "rigid" ? q = !0 : v === "random" ? t = !0 : simpleAbsoluteDirections.indexOf(v) >= 0 ? i.push(v) : simpleRelativeDirections.indexOf(v) >= 0 ? logError('You cannot use relative directions ("^v<>") to indicate in which direction(s) a rule applies. Use absolute directions indicators (Up, Down, Left, Right, Horizontal, or Vertical, for instance), or, if you want the rule to apply in all four directions, do not specify directions', e) : v == "[" ? (i.length == 0 && (i = i.concat(directionaggregates.orthogonal)), h = 1, u--) : logError("The start of a rule must consist of some number of directions (possibly 0), before the first bracket, specifying in what directions to look (with no direction specified, it applies in all four directions). It seems you've just entered \"" + v.toUpperCase() + '".', e);
                break;
            case 1:
                if (v == "[") k.length > 0 && logError('Error, malformed cell rule - encountered a "["" before previous bracket was closed', e), j = [];
                else if (reg_directions_only.exec(v)) j.length % 2 == 1 ? logError("Error, an item can't move in multiple directions.", e) : j.push(v);
                else if (v == "|") j.length % 2 == 1 ? logError("In a rule, if you specify a force, it has to act on an object.", e) : (k.push(j), j = []);
                else if (v === "]") j.length % 2 == 1 ? j[0] === "..." ? logError("Cannot end a rule with ellipses.", e) : logError("In a rule, if you specify a force, it has to act on an object.", e) : (k.push(j), j = []), m ? o.push(k) : n.push(k), k = [];
                else if (v === "->") m && logError('Error, you can only use "->" once in a rule; it\'s used to separate before and after states.', e), k.length > 0 ? logError('Encountered an unexpected "->" inside square brackets. It\'s used to separate states, it has no place inside them >:| .', e) : m = !0;
                else if (b.names.indexOf(v) >= 0) j.length % 2 == 0 ? (j.push(""), j.push(v)) : j.length % 2 == 1 && j.push(v);
                else if (v === "...") j.push(v), j.push(v);
                else if (commandwords.indexOf(v) >= 0) {
                    m === !1 && logError("Commands cannot appear on the left-hand side of the arrow.", e);
                    if (v === "message") {
                        var w = f.match(/message (.*)/i);
                        w === null ? logError("invalid message string", e) : (s.push([v, w[1].trim()]), u = g.length)
                    } else s.push([v])
                } else logError('Error, malformed cell rule - was looking for cell contents, but found "' + v + '". What am I supposed to do with this, eh, please tell me that.', e)
        }
    }
    if (n.length != o.length) s.length > 0 && o.length == 0 || logError("Error, when specifying a rule, the number of matches (square bracketed bits) on the left hand side of the arrow must equal the number on the right", e);
    else
        for (var u = 0; u < n.length; u++) n[u].length != o[u].length && logError("In a rule, each pattern to match on the left must have a corresponding pattern on the right of equal length (number of cells).", e), n[u].length == 0 && logError("You have an totally empty pattern on the left-hand side. This will match *everything*. You certianly don't want this.");
    n.length == 0 && logError("This rule refers to nothing. What the heck? :O", e);
    var x = {
        directions: i,
        lhs: n,
        rhs: o,
        lineNumber: e,
        late: p,
        rigid: q,
        groupNumber: r,
        commands: s,
        randomRule: t
    };
    directionalRule(x) === !1 && (x.directions = ["up"]);
    for (var u = 0; u < s.length; u++) {
        var y = s[u][0];
        y === "restart" ? (s.length > 1 || o.length > 0) && logError("The RESTART command can only appear by itself on the right hand side of the arrow.", e) : y === "cancel" && (s.length > 1 || o.length > 0) && logError("The CANCEL command can only appear by itself on the right hand side of the arrow.", e)
    }
    return x
}

function deepCloneHS(a) {
    var b = a.map(function(a) {
        return a.map(function(a) {
            return a.slice()
        })
    });
    return b
}

function deepCloneRule(a) {
    var b = {
        direction: a.direction,
        lhs: deepCloneHS(a.lhs),
        rhs: deepCloneHS(a.rhs),
        lineNumber: a.lineNumber,
        late: a.late,
        rigid: a.rigid,
        groupNumber: a.groupNumber,
        commands: a.commands,
        randomRule: a.randomRule
    };
    return b
}

function rulesToArray(a) {
    var b = a.rules,
        c = [],
        d = [];
    for (var e = 0; e < b.length; e++) {
        var f = b[e][1],
            g = processRuleString(b[e], a, c);
        if (g.bracket !== undefined) {
            d.push([f, g.bracket]);
            continue
        }
        c.push(g)
    }
    a.loops = d;
    var h = [];
    for (var e = 0; e < c.length; e++) {
        var i = c[e],
            j = i.directions;
        for (var k = 0; k < j.length; k++) {
            var l = j[k];
            if (l in directionaggregates && directionalRule(i)) {
                var m = directionaggregates[l];
                for (var n = 0; n < m.length; n++) {
                    var o = deepCloneRule(i);
                    o.direction = m[n], h.push(o)
                }
            } else {
                var o = deepCloneRule(i);
                o.direction = l, h.push(o)
            }
        }
    }
    for (var e = 0; e < h.length; e++) {
        var i = h[e];
        convertRelativeDirsToAbsolute(i), rewriteUpLeftRules(i), atomizeAggregates(a, i), rephraseSynonyms(a, i)
    }
    var p = [];
    for (var e = 0; e < h.length; e++) {
        var i = h[e];
        p = p.concat(concretizeMovingRule(a, i, i.lineNumber))
    }
    var q = [];
    for (var e = 0; e < p.length; e++) {
        var i = p[e];
        q = q.concat(concretizePropertyRule(a, i, i.lineNumber))
    }
    a.rules = q
}

function containsEllipsis(a) {
    for (var b = 0; b < a.lhs.length; b++)
        for (var c = 0; c < a.lhs[b].length; c++)
            if (a.lhs[b][c][1] === "...") return !0;
    return !1
}

function rewriteUpLeftRules(a) {
    if (containsEllipsis(a)) return;
    if (a.direction == "up") a.direction = "down";
    else if (a.direction == "left") a.direction = "right";
    else return;
    for (var b = 0; b < a.lhs.length; b++) a.lhs[b].reverse(), a.rhs.length > 0 && a.rhs[b].reverse()
}

function getPropertiesFromCell(a, b) {
    var c = [];
    for (var d = 0; d < b.length; d += 2) {
        var e = b[d],
            f = b[d + 1];
        if (e == "random") continue;
        f in a.propertiesDict && c.push(f)
    }
    return c
}

function getMovings(a, b) {
    var c = [];
    for (var d = 0; d < b.length; d += 2) {
        var e = b[d],
            f = b[d + 1];
        e in directionaggregates && c.push([f, e])
    }
    return c
}

function concretizePropertyInCell(a, b, c) {
    for (var d = 0; d < a.length; d += 2) a[d + 1] === b && a[d] !== "random" && (a[d + 1] = c)
}

function concretizeMovingInCell(a, b, c, d) {
    for (var e = 0; e < a.length; e += 2) a[e] === b && a[e + 1] === c && (a[e] = d)
}

function concretizeMovingInCellByAmbiguousMovementName(a, b, c) {
    for (var d = 0; d < a.length; d += 2) a[d] === b && (a[d] = c)
}

function expandNoPrefixedProperties(a, b) {
    var c = [];
    for (var d = 0; d < b.length; d += 2) {
        var e = b[d],
            f = b[d + 1];
        if (e === "no" && f in a.propertiesDict) {
            var g = a.propertiesDict[f];
            for (var h = 0; h < g.length; h++) {
                var i = g[h];
                c.push(e), c.push(i)
            }
        } else c.push(e), c.push(f)
    }
    return c
}

function concretizePropertyRule(a, b, c) {
    for (var d = 0; d < b.lhs.length; d++) {
        var e = b.lhs[d];
        for (var f = 0; f < e.length; f++) e[f] = expandNoPrefixedProperties(a, e[f]), b.rhs.length > 0 && (b.rhs[d][f] = expandNoPrefixedProperties(a, b.rhs[d][f]))
    }
    var g = {};
    for (var f = 0; f < b.rhs.length; f++) {
        var h = b.lhs[f],
            i = b.rhs[f];
        for (var j = 0; j < i.length; j++) {
            var k = getPropertiesFromCell(a, h[j]),
                l = getPropertiesFromCell(a, i[j]);
            for (var m = 0; m < l.length; m++) {
                var n = l[m];
                k.indexOf(n) == -1 && (g[n] = !0)
            }
        }
    }
    var o, p = [b],
        q = !0;
    while (q) {
        q = !1;
        for (var d = 0; d < p.length; d++) {
            var r = p[d];
            o = !1;
            for (var f = 0; f < r.lhs.length && !o; f++) {
                var s = r.lhs[f];
                for (var j = 0; j < s.length && !o; j++) {
                    var t = s[j],
                        u = getPropertiesFromCell(a, t);
                    for (var m = 0; m < u.length; ++m) {
                        var n = u[m];
                        if (a.propertiesSingleLayer.hasOwnProperty(n) && g[n] !== !0) continue;
                        var v = a.propertiesDict[n];
                        o = !0, q = !0;
                        for (var w = 0; w < v.length; w++) {
                            var x = v[w],
                                y = deepCloneRule(r);
                            y.propertyReplacement = {};
                            for (var z in r.propertyReplacement)
                                if (r.propertyReplacement.hasOwnProperty(z)) {
                                    var A = r.propertyReplacement[z];
                                    y.propertyReplacement[z] = [A[0], A[1]]
                                }
                            concretizePropertyInCell(y.lhs[f][j], n, x), y.rhs.length > 0 && concretizePropertyInCell(y.rhs[f][j], n, x), y.propertyReplacement[n] === undefined ? y.propertyReplacement[n] = [x, 1] : y.propertyReplacement[n][1] = y.propertyReplacement[n][1] + 1, p.push(y)
                        }
                        break
                    }
                }
            }
            o && (p.splice(d, 1), d--)
        }
    }
    for (var d = 0; d < p.length; d++) {
        var r = p[d];
        if (r.propertyReplacement === undefined) continue;
        for (var n in r.propertyReplacement)
            if (r.propertyReplacement.hasOwnProperty(n)) {
                var B = r.propertyReplacement[n],
                    x = B[0],
                    C = B[1];
                if (C === 1)
                    for (var f = 0; f < r.rhs.length; f++) {
                        var D = r.rhs[f];
                        for (var j = 0; j < D.length; j++) {
                            var E = D[j];
                            concretizePropertyInCell(E, n, x)
                        }
                    }
            }
    }
    var F = "";
    for (var d = 0; d < p.length; d++) {
        var r = p[d];
        delete p.propertyReplacement;
        for (var f = 0; f < r.rhs.length; f++) {
            var s = r.rhs[f];
            for (var j = 0; j < s.length; j++) {
                var t = s[j],
                    u = getPropertiesFromCell(a, t);
                for (var m = 0; m < u.length; m++) g.hasOwnProperty(u[m]) && (F = u[m])
            }
        }
    }
    return F.length > 0 && logError('This rule has a property on the right-hand side, "' + F + "\", that can't be inferred from the left-hand side. (either for every property on the right there has to be a corresponding one on the left in the same cell, OR, if there's a single occurrence of a particular property name on the left, all properties of the same name on the right are assumed to be the same).", c), p
}

function concretizeMovingRule(a, b, c) {
    var d, e = [b],
        f = !0;
    while (f) {
        f = !1;
        for (var g = 0; g < e.length; g++) {
            var h = e[g];
            d = !1;
            for (var i = 0; i < h.lhs.length; i++) {
                var j = h.lhs[i];
                for (var k = 0; k < j.length; k++) {
                    var l = j[k],
                        m = getMovings(a, l);
                    if (m.length > 0) {
                        d = !0, f = !0;
                        var n = m[0][0],
                            o = m[0][1],
                            p = directionaggregates[o];
                        for (var q = 0; q < p.length; q++) {
                            var r = p[q],
                                s = deepCloneRule(h);
                            s.movingReplacement = {};
                            for (var t in h.movingReplacement)
                                if (h.movingReplacement.hasOwnProperty(t)) {
                                    var u = h.movingReplacement[t];
                                    s.movingReplacement[t] = [u[0], u[1], u[3]]
                                }
                            concretizeMovingInCell(s.lhs[i][k], o, n, r), s.rhs.length > 0 && concretizeMovingInCell(s.rhs[i][k], o, n, r), s.movingReplacement[n] === undefined ? s.movingReplacement[n] = [r, 1, o] : s.movingReplacement[n][1] = s.movingReplacement[n][1] + 1, e.push(s)
                        }
                    }
                }
            }
            d && (e.splice(g, 1), g--)
        }
    }
    for (var g = 0; g < e.length; g++) {
        var h = e[g];
        if (h.movingReplacement === undefined) continue;
        var v = {};
        for (var n in h.movingReplacement)
            if (h.movingReplacement.hasOwnProperty(n)) {
                var w = h.movingReplacement[n],
                    x = w[0],
                    y = w[1],
                    z = w[2];
                z in v || y !== 1 ? v[z] = "INVALID" : v[z] = x;
                if (y === 1)
                    for (var i = 0; i < h.rhs.length; i++) {
                        var A = h.rhs[i];
                        for (var k = 0; k < A.length; k++) {
                            var B = A[k];
                            concretizeMovingInCell(B, z, n, x)
                        }
                    }
            }
        for (var z in v)
            if (v.hasOwnProperty(z) && z !== "INVALID") {
                x = v[z];
                for (var i = 0; i < h.rhs.length; i++) {
                    var A = h.rhs[i];
                    for (var k = 0; k < A.length; k++) {
                        var B = A[k];
                        concretizeMovingInCellByAmbiguousMovementName(B, z, x)
                    }
                }
            }
    }
    var C = "";
    for (var g = 0; g < e.length; g++) {
        var h = e[g];
        delete e.movingReplacement;
        for (var i = 0; i < h.rhs.length; i++) {
            var j = h.rhs[i];
            for (var k = 0; k < j.length; k++) {
                var l = j[k],
                    m = getMovings(a, l);
                m.length > 0 && (C = m[0][1])
            }
        }
    }
    return C.length > 0 && logError('This rule has an ambiguous movement on the right-hand side, "' + C + "\", that can't be inferred from the left-hand side. (either for every ambiguous movement associated to an entity on the right there has to be a corresponding one on the left attached to the same entity, OR, if there's a single occurrence of a particular ambiguous movement on the left, all properties of the same movement attached to the same object on the right are assumed to be the same (or something like that)).", c), e
}

function rephraseSynonyms(a, b) {
    for (var c = 0; c < b.lhs.length; c++) {
        var d = b.lhs[c],
            e = b.rhs[c];
        for (var f = 0; f < d.length; f++) {
            var g = d[f];
            for (var h = 1; h < g.length; h += 2) {
                var i = g[h];
                i in a.synonymsDict && (g[h] = a.synonymsDict[g[h]])
            }
            if (b.rhs.length > 0) {
                var j = e[f];
                for (var h = 1; h < j.length; h += 2) {
                    var i = j[h];
                    i in a.synonymsDict && (j[h] = a.synonymsDict[j[h]])
                }
            }
        }
    }
}

function atomizeAggregates(a, b) {
    for (var c = 0; c < b.lhs.length; c++) {
        var d = b.lhs[c];
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            atomizeCellAggregates(a, f, b.lineNumber)
        }
    }
    for (var c = 0; c < b.rhs.length; c++) {
        var d = b.rhs[c];
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            atomizeCellAggregates(a, f, b.lineNumber)
        }
    }
}

function atomizeCellAggregates(a, b, c) {
    for (var d = 0; d < b.length; d += 2) {
        var e = b[d],
            f = b[d + 1];
        if (f in a.aggregatesDict) {
            e === "no" && logError("You cannot use 'no' to exclude the aggregate object " + f.toUpperCase() + " (defined using 'AND'), only regular objects, or properties (objects defined using 'OR'). If you want to do this, you'll have to write it out yourself the long way.", c);
            var g = a.aggregatesDict[f];
            b[d + 1] = g[0];
            for (var h = 1; h < g.length; h++) b.push(b[d]), b.push(g[h])
        }
    }
}

function convertRelativeDirsToAbsolute(a) {
    var b = a.direction;
    for (var c = 0; c < a.lhs.length; c++) {
        var d = a.lhs[c];
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            absolutifyRuleCell(b, f)
        }
    }
    for (var c = 0; c < a.rhs.length; c++) {
        var d = a.rhs[c];
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            absolutifyRuleCell(b, f)
        }
    }
}

function absolutifyRuleCell(a, b) {
    for (var c = 0; c < b.length; c += 2) {
        var d = b[c],
            e = relativeDirs.indexOf(d);
        e >= 0 && (b[c] = relativeDict[a][e])
    }
}

function rulesToMask(a) {
    var b = a.collisionLayers.length,
        c = [];
    for (var d = 0; d < b; d++) c.push(null);
    for (var d = 0; d < a.rules.length; d++) {
        var e = a.rules[d];
        for (var f = 0; f < e.lhs.length; f++) {
            var g = e.lhs[f],
                h = e.rhs[f];
            for (var i = 0; i < g.length; i++) {
                var j = g[i],
                    k = c.concat([]),
                    l = new BitVec(STRIDE_OBJ),
                    m = new BitVec(STRIDE_OBJ),
                    n = [],
                    o = new BitVec(STRIDE_MOV),
                    p = new BitVec(STRIDE_MOV),
                    q = new BitVec(STRIDE_MOV);
                for (var r = 0; r < j.length; r += 2) {
                    var s = j[r];
                    if (s === "...") {
                        l = ellipsisPattern;
                        if (j.length !== 2) logError("You can't have anything in with an ellipsis. Sorry.", e.lineNumber);
                        else if (i === 0 || i === g.length - 1) logError("There's no point in putting an ellipsis at the very start or the end of a rule", e.lineNumber);
                        else if (e.rhs.length > 0) {
                            var t = h[i];
                            (t.length !== 2 || t[0] !== "...") && logError("An ellipsis on the left must be matched by one in the corresponding place on the right.", e.lineNumber)
                        }
                        break
                    }
                    if (s === "random") {
                        logError("'random' cannot be matched on the left-hand side, it can only appear on the right", e.lineNumber);
                        continue
                    }
                    var u = j[r + 1],
                        v = a.objects[u],
                        w = a.objectMasks[u];
                    if (v) var x = v.layer | 0;
                    else var x = a.propertiesSingleLayer[u];
                    if (s === "no") m.ior(w);
                    else {
                        var y = k[x];
                        y !== null && logError("Rule matches object types that can't overlap: \"" + u.toUpperCase() + '" and "' + y.toUpperCase() + '".', e.lineNumber), k[x] = u, v ? (l.ior(w), q.ishiftor(31, 5 * x)) : n.push(w), s === "stationary" ? p.ishiftor(31, 5 * x) : o.ishiftor(dirMasks[s], 5 * x)
                    }
                }
                if (e.rhs.length > 0) {
                    var t = h[i],
                        z = g[i];
                    t[0] === "..." && z[0] !== "..." && logError("An ellipsis on the right must be matched by one in the corresponding place on the left.", e.lineNumber);
                    for (var r = 0; r < t.length; r += 2) {
                        var A = t[r];
                        A === "..." && t.length !== 2 && logError("You can't have anything in with an ellipsis. Sorry.", e.lineNumber)
                    }
                }
                if (l === ellipsisPattern) {
                    g[i] = ellipsisPattern;
                    continue
                }
                g[i] = new CellPattern([l, m, n, o, p, null]);
                if (e.rhs.length === 0) continue;
                var B = h[i],
                    C = c.concat([]),
                    D = new BitVec(STRIDE_OBJ),
                    E = new BitVec(STRIDE_OBJ),
                    F = new BitVec(STRIDE_MOV),
                    G = new BitVec(STRIDE_MOV),
                    H = new BitVec(STRIDE_MOV),
                    I = new BitVec(STRIDE_OBJ),
                    J = new BitVec(STRIDE_MOV),
                    K = new BitVec(STRIDE_MOV);
                for (var r = 0; r < B.length; r += 2) {
                    var s = B[r],
                        u = B[r + 1];
                    if (s === "...") {
                        logError("spooky ellipsis found! (should never hit this)");
                        break
                    }
                    if (s === "random") {
                        if (u in a.objectMasks) {
                            var L = a.objectMasks[u];
                            I.ior(L)
                        } else logError('You want to spawn a random "' + u.toUpperCase() + "\", but I don't know how to do that", e.lineNumber);
                        continue
                    }
                    var v = a.objects[u],
                        w = a.objectMasks[u];
                    if (v) var x = v.layer | 0;
                    else var x = a.propertiesSingleLayer[u];
                    if (s == "no") D.ior(w);
                    else {
                        var y = C[x];
                        y !== null && logError("Rule matches object types that can't overlap: \"" + u.toUpperCase() + '" and "' + y.toUpperCase() + '".', e.lineNumber), C[x] = u, s.length > 0 && J.ishiftor(31, 5 * x);
                        var M = a.layerMasks[x];
                        v && (E.ibitset(v.id), D.ior(M), H.ishiftor(31, 5 * x)), s === "stationary" && F.ishiftor(31, 5 * x), s === "randomdir" ? K.ishiftor(dirMasks[s], 5 * x) : G.ishiftor(dirMasks[s], 5 * x)
                    }
                }
                l.bitsSetInArray(E.data) || D.ior(l), o.bitsSetInArray(G.data) || F.ior(o);
                for (var r = 0; r < b; r++) k[r] !== null && C[r] === null && (D.ior(a.layerMasks[r]), J.ishiftor(31, 5 * x));
                q.iclear(H), J.ior(q);
                if (D || E || F || G || J) g[i].replacement = new CellReplacement([D, E, F, G, J, I, K])
            }
        }
    }
}

function cellRowMasks(a) {
    var b = [],
        c = a[1];
    for (var d = 0; d < c.length; d++) {
        var e = c[d],
            f = new BitVec(STRIDE_OBJ);
        for (var g = 0; g < e.length; g++) {
            if (e[g] === ellipsisPattern) continue;
            f.ior(e[g].objectsPresent)
        }
        b.push(f)
    }
    return b
}

function collapseRules(a) {
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        for (var d = 0; d < c.length; d++) {
            var e = c[d],
                f = [0, [], e.rhs.length > 0, e.lineNumber],
                g = [];
            for (var h = 0; h < e.lhs.length; h++) g.push(!1);
            f[0] = dirMasks[e.direction];
            for (var h = 0; h < e.lhs.length; h++) {
                var i = e.lhs[h];
                for (var j = 0; j < i.length; j++) i[j] === ellipsisPattern && (g[h] && logError("You can't use two ellipses in a single cell match pattern. If you really want to, please implement it yourself and send me a patch :) ", e.lineNumber), g[h] = !0);
                f[1][h] = i
            }
            f.push(g), f.push(e.groupNumber), f.push(e.rigid), f.push(e.commands), f.push(e.randomRule), f.push(cellRowMasks(f)), c[d] = new Rule(f)
        }
    }
    matchCache = {}
}

function ruleGroupRandomnessTest(a) {
    if (a.length === 0) return;
    var b = a[0].lineNumber;
    for (var c = 1; c < a.length; c++) {
        var d = a[c];
        if (d.lineNumber === b) continue;
        d.randomRule && logError("A rule-group can only be marked random by the first rule", d.lineNumber)
    }
}

function arrangeRulesByGroupNumber(a) {
    var b = {},
        c = {};
    for (var d = 0; d < a.rules.length; d++) {
        var e = a.rules[d],
            f = b;
        e.late && (f = c), f[e.groupNumber] == undefined && (f[e.groupNumber] = []), f[e.groupNumber].push(e)
    }
    var g = [];
    for (var h in b)
        if (b.hasOwnProperty(h)) {
            var i = b[h];
            ruleGroupRandomnessTest(i), g.push(i)
        }
    var j = [];
    for (var h in c)
        if (c.hasOwnProperty(h)) {
            var i = c[h];
            ruleGroupRandomnessTest(i), j.push(i)
        }
    a.rules = g, a.lateRules = j
}

function checkNoLateRulesHaveMoves(a) {
    for (var b = 0; b < a.lateRules.length; b++) {
        var c = a.lateRules[b];
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            for (var f = 0; f < e.patterns.length; f++) {
                var g = e.patterns[f];
                for (var h = 0; h < g.length; h++) {
                    var i = g[h];
                    if (i === ellipsisPattern) continue;
                    var j = i.movementsMissing,
                        k = i.movementsPresent;
                    if (!j.iszero() || !k.iszero()) {
                        logError("Movements cannot appear in late rules.", e.lineNumber);
                        return
                    }
                    if (i.replacement != null) {
                        var l = i.replacement.movementsClear,
                            m = i.replacement.movementsSet;
                        if (!l.iszero() || !m.iszero()) {
                            logError("Movements cannot appear in late rules.", e.lineNumber);
                            return
                        }
                    }
                }
            }
        }
    }
}

function generateRigidGroupList(a) {
    var b = [],
        c = [],
        d = [],
        e = [],
        f = [];
    for (var g = 0; g < a.rules.length; g++) {
        var h = a.rules[g],
            i = !1;
        for (var j = 0; j < h.length; j++) {
            var k = h[j];
            k.isRigid && (i = !0)
        }
        f[g] = i;
        if (i) {
            var l = h[0].groupNumber;
            d[l] = g;
            var m = b.length;
            c[g] = m, e[l] = m, b.push(g)
        }
    }
    b.length > 30 && logError("There can't be more than 30 rigid groups (rule groups containing rigid members).", rules[0][0][3]), a.rigidGroups = f, a.rigidGroupIndex_to_GroupIndex = b, a.groupNumber_to_RigidGroupIndex = e, a.groupIndex_to_RigidGroupIndex = c
}

function getMaskFromName(a, b) {
    var c = new BitVec(STRIDE_OBJ);
    if (b in a.objects) {
        var d = a.objects[b];
        c.ibitset(d.id)
    }
    if (b in a.aggregatesDict) {
        var e = a.aggregatesDict[b];
        for (var f = 0; f < e.length; f++) {
            var g = e[f],
                d = a.objects[g];
            c.ibitset(d.id)
        }
    }
    if (b in a.propertiesDict) {
        var e = a.propertiesDict[b];
        for (var f = 0; f < e.length; f++) {
            var g = e[f],
                d = a.objects[g];
            c.ibitset(d.id)
        }
    }
    if (b in a.synonymsDict) {
        var g = a.synonymsDict[b],
            d = a.objects[g];
        c.ibitset(d.id)
    }
    return c.iszero() && logErrorNoLine("error, didn't find any object called player, either in the objects section, or the legends section. there must be a player!"), c
}

function generateMasks(a) {
    a.playerMask = getMaskFromName(a, "player");
    var b = [],
        c = a.collisionLayers.length;
    for (var d = 0; d < c; d++) {
        var e = new BitVec(STRIDE_OBJ);
        for (var f = 0; f < a.objectCount; f++) {
            var g = a.idDict[f],
                h = a.objects[g];
            h.layer == d && e.ibitset(h.id)
        }
        b.push(e)
    }
    a.layerMasks = b;
    var i = {};
    for (var g in a.objects)
        if (a.objects.hasOwnProperty(g)) {
            var h = a.objects[g];
            i[g] = new BitVec(STRIDE_OBJ), i[g].ibitset(h.id)
        }
    for (var j = 0; j < a.legend_synonyms.length; j++) {
        var k = a.legend_synonyms[j];
        i[k[0]] = i[k[1]]
    }
    for (var j = 0; j < a.legend_properties.length; j++) {
        var l = a.legend_properties[j],
            m = new BitVec(STRIDE_OBJ);
        for (var f = 1; f < l.length; f++) {
            var g = l[f];
            m.ior(i[g])
        }
        i[l[0]] = m
    }
    a.objectMasks = i
}

function checkObjectsAreLayered(a) {
    for (var b in a.objects)
        if (a.objects.hasOwnProperty(b)) {
            var c = !1;
            for (var d = 0; d < a.collisionLayers.length; d++) {
                var e = a.collisionLayers[d];
                for (var f = 0; f < e.length; f++)
                    if (e[f] === b) {
                        c = !0;
                        break
                    }
                if (c) break
            }
            if (c === !1) {
                var g = a.objects[b];
                logError('Object "' + b.toUpperCase() + '" has been defined, but not assigned to a layer.', g.lineNumber)
            }
        }
}

function twiddleMetaData(a) {
    var b = {};
    for (var c = 0; c < a.metadata.length; c += 2) {
        var d = a.metadata[c],
            e = a.metadata[c + 1];
        b[d] = e
    }
    if (b.flickscreen !== undefined) {
        var e = b.flickscreen,
            f = e.split("x"),
            g = [parseInt(f[0]), parseInt(f[1])];
        b.flickscreen = g
    }
    if (b.zoomscreen !== undefined) {
        var e = b.zoomscreen,
            f = e.split("x"),
            g = [parseInt(f[0]), parseInt(f[1])];
        b.zoomscreen = g
    }
    a.metadata = b
}

function processWinConditions(a) {
    var b = [];
    for (var c = 0; c < a.winconditions.length; c++) {
        var d = a.winconditions[c];
        if (d.length == 0) return;
        var e = 0;
        switch (d[0]) {
            case "no":
                e = -1;
                break;
            case "all":
                e = 1
        }
        var f = d[d.length - 1],
            g = d[1],
            h;
        d.length == 5 ? h = d[3] : h = "background";
        var i = 0,
            j = 0;
        g in a.objectMasks ? i = a.objectMasks[g] : logError('unwelcome term "' + g + '" found in win condition. Win conditions objects have to be objects or properties (defined using "or", in terms of other properties)', f), h in a.objectMasks ? j = a.objectMasks[h] : logError('unwelcome term "' + h + '" found in win condition. Win conditions objects have to be objects or properties (defined using "or", in terms of other properties)', f);
        var k = [e, i, j, f];
        b.push(k)
    }
    a.winconditions = b
}

function printCellRow(a) {
    var b = "[ ";
    for (var c = 0; c < a.length; c++) {
        c > 0 && (b += "| ");
        var d = a[c];
        for (var e = 0; e < d.length; e += 2) {
            var f = d[e],
                g = d[e + 1];
            f === "..." ? b += f + " " : b += f + " " + g + " "
        }
    }
    return b += "] ", b
}

function printRule(a) {
    var b = "(<a onclick=\"jumpToLine('" + a.lineNumber.toString() + '\');" href="javascript:void(0);">' + a.groupNumber + "</a>) " + a.direction.toString().toUpperCase() + " ";
    a.rigid && (b = "RIGID " + b + " "), a.randomRule && (b = "RANDOM " + b + " "), a.late && (b = "LATE " + b + " ");
    for (var c = 0; c < a.lhs.length; c++) {
        var d = a.lhs[c];
        b += printCellRow(d)
    }
    b += "-> ";
    for (var c = 0; c < a.rhs.length; c++) {
        var d = a.rhs[c];
        b += printCellRow(d)
    }
    for (var c = 0; c < a.commands.length; c++) {
        var e = a.commands[c];
        e.length === 1 ? b += e[0].toString() : b = b + "(" + e[0].toString() + ", " + e[1].toString() + ") "
    }
    return b
}

function printRules(a) {
    var b = "<br>Rule Assembly : (" + a.rules.length + " rules )<br>===========<br>",
        c = 0,
        d = -1;
    for (var e = 0; e < a.rules.length; e++) {
        var f = a.rules[e];
        c < a.loops.length && a.loops[c][0] < f.lineNumber && (b += "STARTLOOP<br>", c++, c < a.loops.length && (d = a.loops[c][0], c++)), d !== -1 && d < f.lineNumber && (b += "ENDLOOP<br>", d = -1), b += printRule(f) + "<br>"
    }
    d !== -1 && (b += "ENDLOOP<br>"), b += "===========<br>", consolePrint(b)
}

function removeDuplicateRules(a) {
    console.log("rule count before = " + a.rules.length);
    var b = {},
        c = [],
        d = -1;
    for (var e = a.rules.length - 1; e >= 0; e--) {
        var f = a.rules[e],
            g = f.groupNumber;
        g !== d && (b = {});
        var h = printRule(f);
        b.hasOwnProperty(h) ? a.rules.splice(e, 1) : b[h] = !0, d = g
    }
    console.log("rule count after = " + a.rules.length)
}

function generateLoopPoints(a) {
    var b = {},
        c = 0,
        d = !0,
        e = 0,
        f = 0;
    a.loops.length % 2 === 1 && logErrorNoLine("have to have matching number of 'startLoop' and 'endLoop' loop points.");
    for (var g = 0; g < a.loops.length; g++) {
        var h = a.loops[g];
        for (var i = 0; i < a.rules.length; i++) {
            var j = a.rules[i],
                k = j[0],
                l = j[j.length - 1],
                m = k.lineNumber,
                n = l.lineNumber;
            if (d) {
                if (m >= h[0]) {
                    f = i, d = !1, h[1] === -1 && logErrorNoLine("Need have to have matching number of 'startLoop' and 'endLoop' loop points.");
                    break
                }
            } else if (m >= h[0]) {
                e = i - 1, b[e] = f, d = !0, h[1] === 1 && logErrorNoLine("Need have to have matching number of 'startLoop' and 'endLoop' loop points.");
                break
            }
        }
    }
    if (d === !1) {
        var e = a.rules.length;
        b[e] = f
    }
    a.loopPoint = b, b = {}, d = !0;
    for (var g = 0; g < a.loops.length; g++) {
        var h = a.loops[g];
        for (var i = 0; i < a.lateRules.length; i++) {
            var j = a.lateRules[i],
                k = j[0],
                l = j[j.length - 1],
                m = k.lineNumber,
                n = l.lineNumber;
            if (d) {
                if (m >= h[0]) {
                    f = i, d = !1, h[1] === -1 && logErrorNoLine("Need have to have matching number of 'startLoop' and 'endLoop' loop points.");
                    break
                }
            } else if (m >= h[0]) {
                e = i - 1, b[e] = f, d = !0, h[1] === 1 && logErrorNoLine("Need have to have matching number of 'startLoop' and 'endLoop' loop points.");
                break
            }
        }
    }
    if (d === !1) {
        var e = a.lateRules.length;
        b[e] = f
    }
    a.lateLoopPoint = b
}

function validSeed(a) {
    return /^\s*\d+\s*$/.exec(a) !== null
}

function generateSoundData(a) {
    var b = {},
        c = [],
        d = [],
        e = [],
        f = [];
    for (var g = 0; g < a.sounds.length; g++) {
        var h = a.sounds[g];
        if (h.length <= 1) continue;
        var i = h[h.length - 1];
        if (soundEvents.indexOf(h[0]) >= 0) {
            h.length > 4 && logError("too much stuff to define a sound event", i);
            var j = h[1];
            validSeed(j) ? b[h[0]] = h[1] : logError('Expecting sfx data, instead found "' + h[1] + '".', i)
        } else {
            var k = h[0].trim(),
                l = h[1].trim(),
                m = h.slice(2, h.length - 2);
            m.length > 0 && l !== "move" && l !== "cantmove" && logError("incorrect sound declaration.", i), l === "action" && (l = "move", m = ["___action____"]), m.length == 0 && (m = ["orthogonal"]);
            var j = h[h.length - 2];
            k in a.aggregatesDict ? logError('cannot assign sound fevents to aggregate objects (declared with "and"), only to regular objects, or properties, things defined in terms of "or" ("' + k + '").', i) : k in a.objectMasks || logError('Object "' + k + '" not found.', i);
            var n = a.objectMasks[k],
                o = 0;
            for (var p = 0; p < m.length; p++) {
                m[p] = m[p].trim();
                var q = m[p];
                if (soundDirectionIndicators.indexOf(q) === -1) logError('Was expecting a direction, instead found "' + q + '".', i);
                else {
                    var r = soundDirectionIndicatorMasks[q];
                    o |= r
                }
            }
            var s = [k],
                t = !0;
            while (t) {
                t = !1;
                for (var u = 0; u < s.length; u++) {
                    var v = s[u];
                    if (v in a.synonymsDict) s[u] = a.synonymsDict[v], t = !0;
                    else if (v in a.propertiesDict) {
                        t = !0;
                        var w = a.propertiesDict[v];
                        s.splice(u, 1), u--;
                        for (var x = 0; x < w.length; x++) s.push(w[x])
                    }
                }
            }
            if (l === "move" || l === "cantmove")
                for (var p = 0; p < s.length; p++) {
                    var y = s[p],
                        z = a.objects[y],
                        A = z.layer,
                        B = new BitVec(STRIDE_MOV);
                    B.ishiftor(o, 5 * A);
                    var C = {
                        objectMask: n,
                        directionMask: B,
                        seed: j
                    };
                    l === "move" ? e.push(C) : f.push(C)
                }
            validSeed(j) || logError('Expecting sfx data, instead found "' + j + '".', i);
            var D;
            switch (l) {
                case "create":
                    var C = {
                        objectMask: n,
                        seed: j
                    };
                    c.push(C);
                    break;
                case "destroy":
                    var C = {
                        objectMask: n,
                        seed: j
                    };
                    d.push(C)
            }
        }
    }
    a.sfx_Events = b, a.sfx_CreationMasks = c, a.sfx_DestructionMasks = d, a.sfx_MovementMasks = e, a.sfx_MovementFailureMasks = f
}

function formatHomePage(a) {
    "background_color" in a.metadata ? a.bgcolor = colorToHex(colorPalette, a.metadata.background_color) : a.bgcolor = "#000000", "text_color" in a.metadata ? a.fgcolor = colorToHex(colorPalette, a.metadata.text_color) : a.fgcolor = "#FFFFFF", isColor(a.fgcolor) === !1 && logError("text_color in incorrect format - found " + a.fgcolor + ", but I expect a color name (like 'pink') or hex-formatted color (like '#1412FA')."), isColor(a.bgcolor) === !1 && logError("background_color in incorrect format - found " + a.bgcolor + ", but I expect a color name (like 'pink') or hex-formatted color (like '#1412FA').");
    if (canSetHTMLColors) {
        "background_color" in a.metadata && (document.body.style.backgroundColor = a.bgcolor);
        if ("text_color" in a.metadata) {
            var b = document.getElementById("separator");
            b != null && (b.style.color = a.fgcolor);
            var c = document.getElementsByTagName("a");
            for (var d = 0; d < c.length; d++) c[d].style.color = a.fgcolor;
            var c = document.getElementsByTagName("h1");
            for (var d = 0; d < c.length; d++) c[d].style.color = a.fgcolor
        }
    }
    if ("homepage" in a.metadata) {
        var e = a.metadata.homepage;
        e = e.replace("http://", ""), e = e.replace("https://", ""), a.metadata.homepage = e
    }
}

function loadFile(a) {
    window.console.log("loadFile");
    var b = new codeMirrorFn,
        c = b.startState(),
        d = a.split("\n");
    for (var e = 0; e < d.length; e++) {
        var f = d[e];
        c.lineNumber = e + 1;
        var g = new CodeMirror.StringStream(f, 4);
        do {
            b.token(g, c);
            if (errorCount > MAX_ERRORS) {
                consolePrint("too many errors, aborting compilation");
                return
            }
        } while (g.eol() === !1)
    }
    return delete c.lineNumber, generateExtraMembers(c), generateMasks(c), levelsToArray(c), rulesToArray(c), removeDuplicateRules(c), debugMode && printRules(c), rulesToMask(c), arrangeRulesByGroupNumber(c), collapseRules(c.rules), collapseRules(c.lateRules), checkNoLateRulesHaveMoves(c), generateRigidGroupList(c), processWinConditions(c), checkObjectsAreLayered(c), twiddleMetaData(c), generateLoopPoints(c), generateSoundData(c), formatHomePage(c), delete c.commentLevel, delete c.names, delete c.abbrevNames, delete c.objects_candname, delete c.objects_section, delete c.objects_spritematrix, delete c.section, delete c.subsection, delete c.tokenIndex, delete c.visitedSections, delete c.loops, c
}

function compile(a, b, c) {
    matchCache = {}, forceRegenImages = !0, a === undefined && (a = ["restart"]), c === undefined && (c = null), lastDownTarget = canvas;
    if (b === undefined) {
        var d = window.form1.code,
            e = d.editorreference;
        b = e.getValue() + "\n"
    }
    canDump === !0 && (compiledText = b), errorCount = 0, compiling = !0, errorStrings = [], consolePrint("=================================");
    try {
        var f = loadFile(b)
    } finally {
        compiling = !1
    }
    if (errorCount > MAX_ERRORS) return;
    if (errorCount > 0) consoleError('<span class="systemMessage">Errors detected during compilation, the game may not work correctly.</span>');
    else {
        var g = 0;
        for (var h = 0; h < f.rules.length; h++) g += f.rules[h].length;
        for (var h = 0; h < f.lateRules.length; h++) g += f.lateRules[h].length;
        a[0] == "restart" ? consolePrint('<span class="systemMessage">Successful Compilation, generated ' + g + " instructions.</span>") : consolePrint('<span class="systemMessage">Successful live recompilation, generated ' + g + " instructions.</span>")
    }
    setGameState(f, a, c), canDump === !0 && (inputHistory = []), consoleCacheDump()
}

function qualifyURL(a) {
    var b = document.createElement("a");
    return b.href = a, b.href
}
"use strict";
var debugMode, colorPalette;
Level.prototype.calcBackgroundMask = function(a) {
    a.backgroundlayer === undefined && logError("you have to have a background layer");
    var b = a.layerMasks[a.backgroundlayer];
    for (var c = 0; c < this.n_tiles; c++) {
        var d = this.getCell(c);
        d.iand(b);
        if (!d.iszero()) return d
    }
    return d = new BitVec(STRIDE_OBJ), d.ibitset(a.backgroundid), d
};
var directionaggregates = {
        horizontal: ["left", "right"],
        vertical: ["up", "down"],
        moving: ["up", "down", "left", "right", "action"],
        orthogonal: ["up", "down", "left", "right"],
        perpendicular: ["^", "v"],
        parallel: ["<", ">"]
    },
    relativeDirections = ["^", "v", "<", ">", "horizontal", "vertical"],
    simpleAbsoluteDirections = ["up", "down", "left", "right"],
    simpleRelativeDirections = ["^", "v", "<", ">"],
    reg_directions_only = /^(\>|\<|\^|v|up|down|left|right|moving|stationary|no|randomdir|random|horizontal|vertical|orthogonal|perpendicular|parallel|action)$/,
    commandwords = ["sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"],
    relativeDirs = ["^", "v", "<", ">", "parallel", "perpendicular"],
    relativeDict = {
        right: ["up", "down", "left", "right", "horizontal", "vertical"],
        up: ["left", "right", "down", "up", "vertical", "horizontal"],
        down: ["right", "left", "up", "down", "vertical", "horizontal"],
        left: ["down", "up", "right", "left", "horizontal", "vertical"]
    },
    dirMasks = {
        up: parseInt("00001", 2),
        down: parseInt("00010", 2),
        left: parseInt("00100", 2),
        right: parseInt("01000", 2),
        moving: parseInt("01111", 2),
        no: parseInt("00011", 2),
        randomdir: parseInt("00101", 2),
        random: parseInt("10010", 2),
        action: parseInt("10000", 2),
        "": parseInt("00000", 2)
    },
    soundEvents = ["titlescreen", "startgame", "endgame", "startlevel", "undo", "restart", "endlevel", "showmessage", "closemessage", "sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10"],
    soundMaskedEvents = ["create", "destroy", "move", "cantmove", "action"],
    soundVerbs = soundEvents.concat(soundMaskedEvents),
    soundDirectionIndicatorMasks = {
        up: parseInt("00001", 2),
        down: parseInt("00010", 2),
        left: parseInt("00100", 2),
        right: parseInt("01000", 2),
        horizontal: parseInt("01100", 2),
        vertical: parseInt("00011", 2),
        orthogonal: parseInt("01111", 2),
        ___action____: parseInt("10000", 2)
    },
    soundDirectionIndicators = ["up", "down", "left", "right", "horizontal", "vertical", "orthogonal", "___action____"],
    MAX_ERRORS = 5,
    ifrm

function selectText(a, b) {
    b = b || window.event;
    var c = document.getElementById(a);
    if (b && (b.ctrlKey || b.metaKey)) {
        var d = ["console"].concat(c.innerHTML.split("<br>")),
            e = levelFromString(state, d);
        loadLevelFromLevelDat(state, e, null), canvasResize()
    } else if (document.selection) {
        var f = document.body.createTextRange();
        f.moveToElementText(c), f.select()
    } else if (window.getSelection) {
        var f = document.createRange();
        f.selectNode(c), window.getSelection().addRange(f)
    }
}

function recalcLevelBounds() {}

function arrCopy(a, b, c, d, e) {
    while (e--) c[d++] = a[b]++
}

function adjustLevel(a, b, c) {
    backups.push(backupLevel());
    var d = a.clone();
    a.width += b, a.height += c, a.n_tiles = a.width * a.height, a.objects = new Int32Array(a.n_tiles * STRIDE_OBJ);
    var e = new BitVec(STRIDE_OBJ);
    e.ibitset(state.backgroundid);
    for (var f = 0; f < a.n_tiles; ++f) a.setCell(f, e);
    return a.movements = new Int32Array(a.objects.length), columnAdded = !0, RebuildLevelArrays(), d
}

function addLeftColumn() {
    var a = adjustLevel(level, 1, 0);
    for (var b = 1; b < level.width; ++b)
        for (var c = 0; c < level.height; ++c) {
            var d = b * level.height + c;
            level.setCell(d, a.getCell(d - level.height))
        }
}

function addRightColumn() {
    var a = adjustLevel(level, 1, 0);
    for (var b = 0; b < level.width - 1; ++b)
        for (var c = 0; c < level.height; ++c) {
            var d = b * level.height + c;
            level.setCell(d, a.getCell(d))
        }
}

function addTopRow() {
    var a = adjustLevel(level, 0, 1);
    for (var b = 0; b < level.width; ++b)
        for (var c = 1; c < level.height; ++c) {
            var d = b * level.height + c;
            level.setCell(d, a.getCell(d - b - 1))
        }
}

function addBottomRow() {
    var a = adjustLevel(level, 0, 1);
    for (var b = 0; b < level.width; ++b)
        for (var c = 0; c < level.height - 1; ++c) {
            var d = b * level.height + c;
            level.setCell(d, a.getCell(d - b))
        }
}

function removeLeftColumn() {
    if (level.width <= 1) return;
    var a = adjustLevel(level, -1, 0);
    for (var b = 0; b < level.width; ++b)
        for (var c = 0; c < level.height; ++c) {
            var d = b * level.height + c;
            level.setCell(d, a.getCell(d + level.height))
        }
}

function removeRightColumn() {
    if (level.width <= 1) return;
    var a = adjustLevel(level, -1, 0);
    for (var b = 0; b < level.width; ++b)
        for (var c = 0; c < level.height; ++c) {
            var d = b * level.height + c;
            level.setCell(d, a.getCell(d))
        }
}

function removeTopRow() {
    if (level.height <= 1) return;
    var a = adjustLevel(level, 0, -1);
    for (var b = 0; b < level.width; ++b)
        for (var c = 0; c < level.height; ++c) {
            var d = b * level.height + c;
            level.setCell(d, a.getCell(d + b + 1))
        }
}

function removeBottomRow() {
    if (level.height <= 1) return;
    var a = adjustLevel(level, 0, -1);
    for (var b = 0; b < level.width; ++b)
        for (var c = 0; c < level.height; ++c) {
            var d = b * level.height + c;
            level.setCell(d, a.getCell(d + b))
        }
}

function matchGlyph(a, b) {
    var c = -1,
        d;
    for (var e = 0; e < b.length; ++e) {
        var f = b[e][0],
            g = b[e][1];
        if (g.bitsSetInArray(a.data)) {
            var h = 0;
            for (var i = 0; i < 32 * STRIDE_OBJ; ++i) g.get(i) && a.get(i) && h++;
            h > c && (c = h, d = f)
        }
    }
    return c > 0 ? d : (logErrorNoLine("Wasn't able to approximate a glyph value for some tiles, using '.' as a placeholder.", !0), ".")
}

function printLevel() {
    var a = [];
    for (var b in state.glyphDict)
        if (state.glyphDict.hasOwnProperty(b) && b.length === 1) {
            var c = state.glyphDict[b],
                d = new BitVec(STRIDE_OBJ);
            for (var e = 0; e < c.length; e++) {
                var f = c[e];
                f >= 0 && d.ibitset(f)
            }
            a.push([b, d.clone()]);
            var g = state.layerMasks[state.backgroundlayer];
            d.iclear(g), a.push([b, d.clone()]);
            for (var e = 0; e < 32; e++) {
                var h = 1 << e;
                g.get(e) && (d.ibitset(e), a.push([b, d.clone()]), d.ibitclear(e))
            }
        }
    selectableint++;
    var i = "selectable" + selectableint,
        j = 'Printing level contents:<br><br><span id="' + i + '" onclick="selectText(\'' + i + "',event)\">";
    cache_console_messages = !1;
    for (var k = 0; k < level.height; k++) {
        for (var e = 0; e < level.width; e++) {
            var l = k + e * level.height,
                m = level.getCell(l),
                c = matchGlyph(m, a);
            c in htmlEntityMap && (c = htmlEntityMap[c]), j += c
        }
        k < level.height - 1 && (j += "<br>")
    }
    j += "</span><br>", consolePrint(j, !0)
}

function levelEditorClick(a, b) {
    if (mouseCoordY <= -2) {
        var c = editorRowCount - (-mouseCoordY - 2) - 1,
            d = mouseCoordX + (screenwidth - 1) * c;
        mouseCoordX === -1 ? printLevel() : mouseCoordX >= 0 && d < glyphImages.length && (glyphSelectedIndex = d, redraw())
    } else if (mouseCoordX > -1 && mouseCoordY > -1 && mouseCoordX < screenwidth - 2 && mouseCoordY < screenheight - 2 - editorRowCount) {
        var e = glyphImagesCorrespondance[glyphSelectedIndex],
            f = state.glyphDict[e],
            g = new BitVec(STRIDE_OBJ);
        for (var h = 0; h < f.length; h++) {
            var i = f[h];
            i >= 0 && g.ibitset(i)
        }
        var j = state.layerMasks[state.backgroundlayer];
        g.bitsClearInArray(j) && g.ibitset(state.backgroundid);
        var k = mouseCoordY + mouseCoordX * level.height,
            l = level.getCell(k);
        if (l.equals(g)) return;
        anyEditsSinceMouseDown === !1 && (anyEditsSinceMouseDown = !0, backups.push(backupLevel())), level.setCell(k, g), redraw()
    } else b && (mouseCoordX === -1 ? (addLeftColumn(), canvasResize()) : mouseCoordX === screenwidth - 2 && (addRightColumn(), canvasResize()), mouseCoordY === -1 ? (addTopRow(), canvasResize()) : mouseCoordY === screenheight - 2 - editorRowCount && (addBottomRow(), canvasResize()))
}

function levelEditorRightClick(a, b) {
    if (mouseCoordY === -2) mouseCoordX <= glyphImages.length && (glyphSelectedIndex = mouseCoordX, redraw());
    else if (mouseCoordX > -1 && mouseCoordY > -1 && mouseCoordX < screenwidth - 2 && mouseCoordY < screenheight - 2 - editorRowCount) {
        var c = mouseCoordY + mouseCoordX * level.height,
            d = new BitVec(STRIDE_OBJ);
        d.ibitset(state.backgroundid), level.setCell(c, d), redraw()
    } else b && (mouseCoordX === -1 ? (removeLeftColumn(), canvasResize()) : mouseCoordX === screenwidth - 2 && (removeRightColumn(), canvasResize()), mouseCoordY === -1 ? (removeTopRow(), canvasResize()) : mouseCoordY === screenheight - 2 - editorRowCount && (removeBottomRow(), canvasResize()))
}

function onMouseDown(a) {
    if (a.button === 0 && !a.ctrlKey && !a.metaKey) {
        lastDownTarget = a.target, keybuffer = [];
        if (a.target === canvas) {
            setMouseCoord(a), dragging = !0, rightdragging = !1;
            if (levelEditorOpened) return anyEditsSinceMouseDown = !1, levelEditorClick(a, !0)
        }
        dragging = !1, rightdragging = !1
    } else if (a.button === 2 || a.button === 0 && (a.ctrlKey || a.metaKey))
        if (a.target.id === "gameCanvas") {
            dragging = !1, rightdragging = !0;
            if (levelEditorOpened) return levelEditorRightClick(a, !0)
        }
}

function rightClickCanvas(a) {
    return prevent(a)
}

function onMouseUp(a) {
    dragging = !1, rightdragging = !1
}

function onKeyDown(a) {
    a = a || window.event, !IDE && [32, 37, 38, 39, 40].indexOf(a.keyCode) > -1 && prevent(a);
    if (keybuffer.indexOf(a.keyCode) >= 0) return;
    lastDownTarget === canvas && keybuffer.indexOf(a.keyCode) === -1 && (keybuffer.splice(keyRepeatIndex, 0, a.keyCode), keyRepeatTimer = 0, checkKey(a, !0)), canDump === !0 && (a.keyCode === 74 && (a.ctrlKey || a.metaKey) ? (dumpTestCase(), prevent(a)) : a.keyCode === 75 && (a.ctrlKey || a.metaKey) && (makeGIF(), prevent(a)))
}

function relMouseCoords(a) {
    var b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = this;
    do b += f.offsetLeft - f.scrollLeft, c += f.offsetTop - f.scrollTop; while (f = f.offsetParent);
    return d = a.pageX - b, e = a.pageY - c, {
        x: d,
        y: e
    }
}

function onKeyUp(a) {
    a = a || window.event;
    var b = keybuffer.indexOf(a.keyCode);
    b >= 0 && (keybuffer.splice(b, 1), keyRepeatIndex >= b && keyRepeatIndex--)
}

function onMyFocus(a) {
    keybuffer = [], keyRepeatIndex = 0, keyRepeatTimer = 0
}

function onMyBlur(a) {
    keybuffer = [], keyRepeatIndex = 0, keyRepeatTimer = 0
}

function setMouseCoord(a) {
    var b = canvas.relMouseCoords(a);
    mouseCoordX = b.x - xoffset, mouseCoordY = b.y - yoffset, mouseCoordX = Math.floor(mouseCoordX / cellwidth), mouseCoordY = Math.floor(mouseCoordY / cellheight)
}

function mouseMove(a) {
    levelEditorOpened && (setMouseCoord(a), dragging ? levelEditorClick(a, !1) : rightdragging && levelEditorRightClick(a, !1), redraw())
}

function mouseOut() {}

function prevent(a) {
    return a.preventDefault && a.preventDefault(), a.stopImmediatePropagation && a.stopImmediatePropagation(), a.stopPropagation && a.stopPropagation(), a.returnValue = !1, !1
}

function checkKey(a, b) {
    if (winning) return;
    var c = -1;
    switch (a.keyCode) {
        case 65:
        case 37:
            c = 1;
            break;
        case 38:
        case 87:
            c = 0;
            break;
        case 68:
        case 39:
            c = 3;
            break;
        case 83:
        case 40:
            c = 2;
            break;
        case 13:
        case 32:
        case 67:
        case 88:
            if (norepeat_action === !1 || b) c = 4;
            else return;
            break;
        case 85:
        case 90:
            if (textMode === !1) return canDump === !0 && inputHistory.push("undo"), DoUndo(), canvasResize(), prevent(a);
            break;
        case 82:
            if (textMode === !1 && b) return canDump === !0 && inputHistory.push("restart"), DoRestart(), canvasResize(), prevent(a);
            break;
        case 27:
            if (titleScreen === !1) return goToTitleScreen(), tryPlayTitleSound(), canvasResize(), prevent(a);
            break;
        case 69:
            if (canOpenEditor) return b && (levelEditorOpened = !levelEditorOpened, restartTarget = backupLevel(), canvasResize()), prevent(a);
            break;
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            if (levelEditorOpened && b) {
                var d = 9;
                return a.keyCode >= 49 && (d = a.keyCode - 49), d < glyphImages.length ? glyphSelectedIndex = d : consolePrint("Trying to select tile outside of range in level editor.", !0), canvasResize(), prevent(a)
            }
    }
    if (throttle_movement && c >= 0 && c <= 3) {
        if (lastinput == c && input_throttle_timer < repeatinterval) return;
        lastinput = c, input_throttle_timer = 0
    }
    if (textMode) {
        if (state.levels.length !== 0)
            if (titleScreen) {
                if (titleMode === 0) c === 4 && b && titleSelected === !1 && (tryPlayStartGameSound(), titleSelected = !0, messageselected = !1, timer = 0, quittingTitleScreen = !0, generateTitleScreen(), canvasResize());
                else if (c == 4 && b) titleSelected === !1 && (tryPlayStartGameSound(), titleSelected = !0, messageselected = !1, timer = 0, quittingTitleScreen = !0, generateTitleScreen(), redraw());
                else if (c === 0 || c === 2) titleSelection = 1 - titleSelection, generateTitleScreen(), redraw()
            } else if (c == 4 && b) {
            if (unitTesting) {
                nextLevel();
                return
            }
            messageselected === !1 && (messageselected = !0, timer = 0, quittingMessageScreen = !0, tryPlayCloseMessageSound(), titleScreen = !1, drawMessageScreen())
        }
    } else if (!againing && c >= 0) return canDump === !0 && inputHistory.push(c), c === 4 && "noaction" in state.metadata || processInput(c) && redraw(), prevent(a)
}

function update() {
    timer += deltatime, input_throttle_timer += deltatime, quittingTitleScreen && timer / 1e3 > .3 && (quittingTitleScreen = !1, nextLevel()), againing && timer > againinterval && processInput(-1) && (redraw(), keyRepeatTimer = 0, autotick = 0), quittingMessageScreen && timer / 1e3 > .15 && (quittingMessageScreen = !1, messagetext === "" ? nextLevel() : (messagetext = "", textMode = !1, titleScreen = !1, titleMode = curlevel > 0 ? 1 : 0, titleSelected = !1, titleSelection = 0, canvasResize(), checkWin())), winning && timer / 1e3 > .5 && (winning = !1, nextLevel());
    if (keybuffer.length > 0) {
        keyRepeatTimer += deltatime;
        var a = throttle_movement ? repeatinterval : repeatinterval / Math.sqrt(keybuffer.length);
        if (keyRepeatTimer > a) {
            keyRepeatTimer = 0, keyRepeatIndex = (keyRepeatIndex + 1) % keybuffer.length;
            var b = keybuffer[keyRepeatIndex];
            checkKey({
                keyCode: b
            }, !1)
        }
    }
    autotickinterval > 0 && !textMode && !levelEditorOpened && !againing && (autotick += deltatime, autotick > autotickinterval && (autotick = 0, canDump === !0 && inputHistory.push("tick"), processInput(-1) && redraw()))
}
var keyRepeatTimer = 0,
    keyRepeatIndex = 0,
    input_throttle_timer = 0,
    lastinput = -100,
    dragging = !1,
    rightdragging = !1,
    columnAdded = !1,
    htmlEntityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    },
    selectableint = 0,
    anyEditsSinceMouseDown = !1;
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
var mouseCoordX = 0,
    mouseCoordY = 0;
document.addEventListener("mousedown", onMouseDown, !1), document.addEventListener("mouseup", onMouseUp, !1), document.addEventListener("keydown", onKeyDown, !1), document.addEventListener("keyup", onKeyUp, !1), window.addEventListener("focus", onMyFocus, !1), window.addEventListener("blur", onMyBlur, !1), setInterval(function() {
    update()
}, deltatime)

function Animatable(a, b, c) {
    function f() {
        var a;
        return d += b, d >= 1 && (a = !0, d = 1), c(d), a
    }

    function g() {
        var a;
        return d -= b, d <= 0 && (a = !0, d = 0), c(d), a
    }
    var d, e;
    return e = {
        animateUp: function() {
            Animator.getInstance().animate(a, f)
        },
        animateDown: function() {
            Animator.getInstance().animate(a, g)
        }
    }, d = 0, e
}
window.Mobile = {}, Mobile.hasTouch = function() {
        return document.documentElement && document.documentElement.hasOwnProperty("ontouchstart")
    }, Mobile.enable = function(a) {
        if (a || Mobile.hasTouch() && !Mobile._instance) Mobile._instance = new Mobile.GestureHandler, Mobile._instance.bindEvents(), Mobile._instance.bootstrap();
        return Mobile._instance
    }, window.Mobile.GestureHandler = function() {
        this.initialize.apply(this, arguments)
    }, Mobile.log = function(a) {
        var b;
        b = document.getElementsByTagName("h1")[0], b.innerHTML = "" + Math.random().toString().substring(4, 1) + "-" + a
    }, Mobile.debugDot = function(a) {
        var b, c, d;
        d = "border-radius: 50px;width: 5px;height: 5px;background: red;position: absolute;left: " + a.touches[0].clientX + "px;" + "top: " + a.touches[0].clientY + "px;", b = document.createElement("div"), b.setAttribute("style", d), c = document.getElementsByTagName("body")[0], c.appendChild(b)
    },
    function(a) {
        "use strict";
        var b = 10,
            c = 50,
            d = 1e3,
            e = 150,
            f = {
                action: 88,
                left: 37,
                right: 39,
                up: 38,
                down: 40,
                undo: 85,
                restart: 82,
                quit: 27
            },
            g = ['<div class="tab">', ' <div class="tab-affordance"></div>', ' <div class="tab-icon">', ' <div class="slice"></div>', ' <div class="slice"></div>', " </div>", "</div>"].join("\n");
        a.initialize = function() {
            this.firstPos = {
                x: 0,
                y: 0
            }, this.setTabAnimationRatio = this.setTabAnimationRatio.bind(this), this.setMenuAnimationRatio = this.setMenuAnimationRatio.bind(this), this.repeatTick = this.repeatTick.bind(this), this.isFocused = !0
        }, a.setFocusElement = function(a) {
            this.focusElement = a, this.isFocused = !1, this.buildFocusIndicator()
        }, a.bindEvents = function() {
            window.addEventListener("touchstart", this.onTouchStart.bind(this)), window.addEventListener("touchend", this.onTouchEnd.bind(this)), window.addEventListener("touchmove", this.onTouchMove.bind(this))
        }, a.bootstrap = function() {
            this.showTab(), this.isAudioSupported() || this.disableAudio(), this.disableSelection()
        }, a.onTouchStart = function(a) {
            if (this.isTouching) return;
            this.handleFocusChange(a);
            if (!this.isFocused) return;
            if (a.target.tagName.toUpperCase() === "A") return;
            this.isTouching = !0, this.mayBeSwiping = !0, this.gestured = !1, this.swipeDirection = undefined, this.swipeDistance = 0, this.startTime = (new Date).getTime(), this.firstPos.x = a.touches[0].clientX, this.firstPos.y = a.touches[0].clientY
        }, a.onTouchEnd = function(a) {
            if (!this.isFocused) return;
            if (!this.isTouching) return;
            this.gestured || a.touches.length === 0 && this.handleTap(), a.touches.length === 0 && (this.isTouching = !1, this.endRepeatWatcher())
        }, a.onTouchMove = function(a) {
            if (!this.isFocused) return;
            return this.isSuccessfulSwipe() ? (this.handleSwipe(this.swipeDirection, this.touchCount), this.gestured = !0, this.mayBeSwiping = !1, this.beginRepeatWatcher(a)) : this.mayBeSwiping ? this.swipeStep(a) : this.isRepeating && this.repeatStep(a), prevent(a), !1
        }, a.handleFocusChange = function(a) {
            if (!this.focusElement) return;
            this.isFocused = this.isTouchInsideFocusElement(a), this.setFocusIndicatorVisibility(this.isFocused)
        }, a.isTouchInsideFocusElement = function(a) {
            var b;
            return !a.touches || !a.touches[0] ? !1 : (b = this.absoluteElementPosition(this.focusElement), a.touches[0].clientX < b.left || a.touches[0].clientY < b.top ? !1 : a.touches[0].clientX > b.left + this.focusElement.clientWidth || a.touches[0].clientY > b.top + this.focusElement.clientHeight ? !1 : !0)
        }, a.setFocusIndicatorVisibility = function(a) {
            var b;
            b = "visible", a || (b = "hidden"), this.focusIndicator.setAttribute("style", "visibility: " + b + ";")
        }, a.absoluteElementPosition = function(a) {
            var b, c;
            b = {
                top: a.offsetTop || 0,
                left: a.offsetLeft || 0
            }, c = document.getElementsByTagName("body")[0], b.top -= c.scrollTop || 0;
            for (;;) {
                a = a.offsetParent;
                if (!a) break;
                b.top += a.offsetTop || 0, b.left += a.offsetLeft || 0
            }
            return b
        }, a.beginRepeatWatcher = function(a) {
            var b;
            if (this.repeatInterval) return;
            this.isRepeating = !0, b = state.metadata.key_repeat_interval * 1e3;
            if (isNaN(b) || !b) b = e;
            this.repeatInterval = setInterval(this.repeatTick, b), this.recenter(a)
        }, a.endRepeatWatcher = function() {
            this.repeatInterval && (clearInterval(this.repeatInterval), delete this.repeatInterval, this.isRepeating = !1)
        }, a.repeatTick = function() {
            this.isTouching && this.handleSwipe(this.direction, this.touchCount)
        }, a.recenter = function(a) {
            this.firstPos.x = a.touches[0].clientX, this.firstPos.y = a.touches[0].clientY
        }, a.isSuccessfulSwipe = function() {
            var a;
            return this.mayBeSwiping && this.swipeDirection !== undefined && this.swipeDistance >= c && (a = !0), a
        }, a.swipeStep = function(a) {
            var e, f, g, h;
            if (!this.mayBeSwiping) return;
            e = {
                x: a.touches[0].clientX,
                y: a.touches[0].clientY
            }, g = (new Date).getTime(), h = a.touches.length, this.swipeDistance = this.cardinalDistance(this.firstPos, e), this.swipeDirection ? f < c ? (direction = this.dominantDirection(this.firstPos, e), direction !== this.swipeDirection && (this.mayBeSwiping = !1), h < this.touchCount && (this.mayBeSwiping = !1)) : g - this.startTime > d && (this.mayBeSwiping = !1) : this.swipeDistance > b && (this.swipeDirection = this.dominantDirection(this.firstPos, e), this.touchCount = h)
        }, a.repeatStep = function(a) {
            var b, d, e, f, g;
            b = {
                x: a.touches[0].clientX,
                y: a.touches[0].clientY
            }, f = this.cardinalDistance(this.firstPos, b), f >= c && (this.swipeDirection = this.dominantDirection(this.firstPos, b), this.recenter(a))
        }, a.cardinalDistance = function(a, b) {
            var c, d;
            return c = Math.abs(a.x - b.x), d = Math.abs(a.y - b.y), Math.max(c, d)
        }, a.dominantDirection = function(a, b) {
            var c, d, e, f;
            return c = b.x - a.x, d = b.y - a.y, e = "x", Math.abs(d) > Math.abs(c) && (e = "y"), e === "x" ? c > 0 ? f = "right" : f = "left" : d > 0 ? f = "down" : f = "up", f
        }, a.handleSwipe = function(a, b) {
            b === 1 ? this.emitKeydown(this.swipeDirection) : b > 1 && this.toggleMenu()
        }, a.handleTap = function() {
            this.emitKeydown("action")
        }, a.emitKeydown = function(a) {
            var b;
            b = {
                keyCode: f[a]
            }, this.fakeCanvasFocus(), onKeyDown(b), onKeyUp(b)
        }, a.fakeCanvasFocus = function() {
            var a;
            a = document.getElementById("gameCanvas"), onMouseDown({
                button: 0,
                target: a
            })
        }, a.toggleMenu = function() {
            this.isMenuVisible ? this.hideMenu() : this.showMenu()
        }, a.showMenu = function() {
            this.menuElem || this.buildMenu(), this.getAnimatables().menu.animateUp(), this.isMenuVisible = !0, this.hideTab()
        }, a.hideMenu = function() {
            this.menuElem && this.getAnimatables().menu.animateDown(), this.isMenuVisible = !1, this.showTab()
        }, a.getAnimatables = function() {
            var a = this;
            return this._animatables || (this._animatables = {
                tab: Animatable("tab", .1, a.setTabAnimationRatio),
                menu: Animatable("menu", .1, a.setMenuAnimationRatio)
            }), this._animatables
        }, a.showTab = function() {
            this.tabElem || this.buildTab(), this.getAnimatables().tab.animateDown()
        }, a.hideTab = function() {
            this.tabElem && this.tabElem.setAttribute("style", "display: none;"), this.getAnimatables().tab.animateUp()
        }, a.buildTab = function() {
            var a = this,
                b, c, d, e, f;
            b = document.createElement("div"), b.innerHTML = g, f = b.children[0], d = function(b) {
                b.stopPropagation(), a.showMenu()
            }, this.tabAffordance = f.getElementsByClassName("tab-affordance")[0], this.tabElem = f.getElementsByClassName("tab-icon")[0], this.tabAffordance.addEventListener("touchstart", d), this.tabElem.addEventListener("touchstart", d), c = document.getElementsByTagName("body")[0], c.appendChild(f)
        }, a.buildMenu = function() {
            var a = this,
                b, c, d, e, f, g, h;
            b = document.createElement("div"), b.innerHTML = this.buildMenuString(state), this.menuElem = b.children[0], this.closeElem = this.menuElem.getElementsByClassName("close")[0], h = function(b) {
                b.stopPropagation(), a.hideMenu()
            }, this.closeAffordance = this.menuElem.getElementsByClassName("close-affordance")[0], g = this.menuElem.getElementsByClassName("close")[0], this.closeAffordance.addEventListener("touchstart", h), g.addEventListener("touchstart", h), d = this.menuElem.getElementsByClassName("undo")[0], d && d.addEventListener("touchstart", function(b) {
                b.stopPropagation(), a.emitKeydown("undo")
            }), e = this.menuElem.getElementsByClassName("restart")[0], e && e.addEventListener("touchstart", function(b) {
                b.stopPropagation(), a.emitKeydown("restart")
            }), f = this.menuElem.getElementsByClassName("quit")[0], f.addEventListener("touchstart", function(b) {
                b.stopPropagation(), a.emitKeydown("quit")
            }), c = document.getElementsByTagName("body")[0], c.appendChild(this.menuElem)
        }, a.buildMenuString = function(a) {
            var b, c, d, e;
            return d = a.metadata.noundo, e = a.metadata.norestart, b = 3, d && (b -= 1), e && (b -= 1), c = ['<div class="mobile-menu item-count-' + b + '">', ' <div class="close-affordance"></div>', ' <div class="close">', ' <div class="slice"></div>', ' <div class="slice"></div>', " </div>"], d || c.push(' <div class="undo button">Undo</div>'), e || c.push(' <div class="restart button">Restart</div>'), c = c.concat([' <div class="quit button">Quit to Menu</div>', ' <div class="clear"></div>', "</div>"]), c.join("\n")
        }, a.buildFocusIndicator = function() {
            var a;
            this.focusIndicator = document.createElement("DIV"), this.focusIndicator.setAttribute("class", "tapFocusIndicator"), this.focusIndicator.setAttribute("style", "visibility: hidden;"), a = this.focusElement.parentNode, a.appendChild(this.focusIndicator)
        }, a.setTabAnimationRatio = function(a) {
            var b = 18,
                c = 66,
                d, e, f;
            a = Math.round(a * 1e3) / 1e3, a >= .999 ? this.tabAffordance.setAttribute("style", "display: none;") : this.tabAffordance.setAttribute("style", "display: block;"), d = c * a + b * (1 - a), e = "opacity: " + (1 - a) + ";", f = e + " " + "width: " + d + "px;", this.tabElem.setAttribute("style", f)
        }, a.setMenuAnimationRatio = function(a) {
            var b = -66,
                c = -18,
                d, e, f;
            a = Math.round(a * 1e3) / 1e3, a <= .001 ? this.closeAffordance.setAttribute("style", "display: none;") : this.closeAffordance.setAttribute("style", "display: block;"), d = c * a + b * (1 - a), e = "opacity: " + a + ";", f = "left: " + (d - 4) + "px; " + e + " " + "width: " + -d + "px;", this.closeElem.setAttribute("style", f), this.menuElem.setAttribute("style", e)
        }, a.disableAudio = function() {
            window.playSeed = function() {}
        }, a.isAudioSupported = function() {
            var a = !0;
            return webkitAudioContext && (a = !1), a
        }, a.disableSelection = function() {
            var a;
            a = document.getElementsByTagName("body")[0], a.setAttribute("class", a.getAttribute("class") + " disable-select")
        }
    }(window.Mobile.GestureHandler.prototype), window.Animator = function() {
        this.initialize.apply(this, arguments)
    },
    function(a) {
        a.initialize = function() {
            this._animations = {}, this.tick = this.tick.bind(this)
        }, a.animate = function(a, b) {
            this._animations[a] = b, this.wakeup()
        }, a.wakeup = function() {
            if (this._isAnimating) return;
            this._isAnimating = !0, this.tick()
        }, a.tick = function() {
            var a, b, c, d, e;
            d = [], c = !0;
            for (a in this._animations) {
                if (!this._animations.hasOwnProperty(a)) return;
                b = this._animations[a](), b ? d.push(a) : c = !1
            }
            if (!c) requestAnimationFrame(this.tick);
            else {
                for (e = 0; e < d.length; d++) delete this._isAnimating[d[e]];
                this._isAnimating = !1
            }
        }
    }(window.Animator.prototype), window.Animator.getInstance = function() {
        return window.Animator._instance || (window.Animator._instance = new window.Animator), window.Animator._instance
    },
    function() {
        "use strict";
        var a = ["ms", "moz", "webkit", "o"],
            b, c;
        for (b = 0; b < a.length && !window.requestAnimationFrame; b++) window.requestAnimationFrame = window[a[b] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[a[b] + "CancelAnimationFrame"], window.cancelAnimationFrame || (window.cancelAnimationFrame = window[a[b] + "CancelRequestAnimationFrame"]);
        window.requestAnimationFrame || (c = 0, window.requestAnimationFrame = function(a, b) {
            var d, e, f;
            return d = (new Date).getTime(), e = Math.max(0, 16 - (d - c)), f = window.setTimeout(function() {
                a(d + e)
            }, e), c = d + e, f
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        })
    }()

compile(["restart"], sourceCode)
