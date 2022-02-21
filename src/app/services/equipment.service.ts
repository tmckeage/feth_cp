import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  facilityTransducer: any[] = [];
  roomTransducer: any[] = [];
  typeTransducer: any[] = [];



  constructor(private http: HttpClient) {
    this.facilityTransducer = ['CIRS', 'Fathom'];
    this.roomTransducer = ['RM1', 'RM2', 'RM3'];
    this.typeTransducer = ['Monthly', 'Quarterly', 'Annual', 'Acceptance']
  }

  scanners = [
    {
      name: "GE Logiq: L12345678",
      cirs: "CIRS",
      rm: "RM1",
      due: "09/14/21",
      lastStudy: "Complete",
      transducer: [
        { name: 'RM1', scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM2', scan: 'C26:L1q235', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM3', scan: 'C26:L1q236', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM3', scan: 'C26:L1q237', scan1: 'L412:M1234', scan2: 'E27:L1234' }
      ]
    },
    {
      name: "Philips: M12345678",
      cirs: "Fathom",
      rm: "RM2",
      due: "09/01/21",
      lastStudy: "Acceptance",
      transducer: [
        { name: 'RM1', scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM2', scan: 'C26:L1q235', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM3', scan: 'C26:L1q236', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM3', scan: 'C26:L1q237', scan1: 'L412:M1234', scan2: 'E27:L1234' }
      ]
    }
  ];

  horizontal = {
    "d": 14.22784771, "depth": [-0.07410127640723645, -0.165929818699775, -0.2708543839369971, -0.38742876334143755, -0.4923902401206944, -0.5262581010516298, -0.39738940736688816, -0.010787606117655932, 0.7510624520011484, 2.0056870090520604, 3.8243210860359413, 6.2152957997273335, 9.130452039809237, 12.502067692524024, 16.17852948528416, 19.981354877476523, 23.724558701756475, 27.228874777667457, 30.364131533315224, 33.04176627778923, 35.23234448752126, 36.96253853034286, 38.315112087141756, 39.40713394486269, 40.35234488949256, 41.25812407325322, 42.215013813862704, 43.27703436926051, 44.44509830161914, 45.697990292286455, 47.003418780344546, 48.318659475521855, 49.66825124792268, 50.956676337937466, 52.172651158643376, 53.31674716922697, 54.39894476829974, 55.442989423988095, 56.47264247011093, 57.53076255437685, 58.647832940414304, 59.838412392998784, 61.10848935417032, 62.47356721215021, 63.94742845291124, 65.49280156254893, 67.09653882780273, 68.75248278942925, 70.44027235209913, 72.14974122481769, 73.87768526589522, 75.62046539807359, 77.36966124734326, 79.12382616933715, 80.8895690079674, 82.65505893147999, 84.41822711394599, 86.16831793775148, 87.89309738326867, 89.5780594766297, 91.2248701334882, 92.82555616590442, 94.37833256666887, 95.86071577409484, 97.28294915760091, 98.65302963894092, 99.94700968980229, 101.14849695597049, 102.24887764502417, 103.23602555022154, 104.10118457359084, 104.8359012765553, 105.43293050364409, 105.90558943901114, 106.27758534557614, 106.57152333299396, 106.79912166815524, 106.98237288964226, 107.14282937769745, 107.2814165331989, 107.40499810890232, 107.51078751113523, 107.57386993324837, 107.56833977194137, 107.48023633761964, 107.30336389193266, 107.02286610215491, 106.64242741467768, 106.17994687487698, 105.66859024232745, 105.13880623993202, 104.624590598368, 104.16259725022874, 103.7841308026432, 103.50725967427161, 103.35924072602353, 103.32407081750617, 103.3847790548342, 103.51449268910963, 103.70275896485964, 103.91839259044866, 104.11283765072518, 104.25568764217137, 104.33458732478816, 104.34829503441591, 104.26875089823127, 104.08436171362216, 103.79663982757984, 103.42087228980701, 102.96800325290853, 102.45449073121307, 101.91297548337886, 101.36524102482056, 100.85282615400408, 100.40469273170004, 100.04777437324444, 99.80377986263132, 99.67553437290493, 99.66420488816304, 99.75154902229505, 99.90873578822044, 100.10118751911506, 100.29696060097494, 100.46599320963279, 100.58192030048426, 100.63722525463484, 100.6046551275172, 100.48462307537358, 100.29327223982027, 100.03143734712192, 99.72629090633367, 99.37858770797365, 99.00071304167872, 98.62130364441104, 98.24837408781565, 97.88054116190398, 97.51602705180957, 97.17143056999656, 96.85405079313594, 96.56278232062782, 96.28337991325759, 96.00829830402722, 95.73582888091345, 95.45386441658727, 95.16564241434673, 94.8566984531546, 94.52389565961451, 94.1712490157554, 93.80608789219802, 93.44042463454646, 93.06727931808607, 92.68795945967139, 92.31179512011629, 91.95008508662075, 91.59355808409788, 91.24659293100086, 90.90151089055202, 90.54497511935988, 90.1852872595665, 89.8115731163789, 89.42179870387525, 89.01770963237266, 88.59317510180159, 88.15166499930426, 87.68679281919549, 87.1944164124383, 86.6852236257075, 86.16918825730022, 85.66809598264541, 85.19279534081699, 84.76048218787496, 84.37606145454455, 84.04587746607527, 83.76077612595844, 83.51302847864001, 83.26926706524337, 82.99347325357813, 82.65912756507883, 82.2545435427244, 81.77471315706427, 81.21288644545325, 80.58662895587075, 79.92734199381525, 79.28611843598057, 78.7019232482896, 78.19350700781851, 77.79468819078116, 77.50998592569242, 77.33591357259706, 77.23863473963824, 77.17878287025066, 77.12316135301398, 77.02378097183771, 76.85516872168344, 76.60383853389817, 76.25526049124386, 75.8305823871292, 75.34953856785305, 74.84588265384731, 74.35497725658341, 73.90602008248305, 73.52305360633919, 73.21912718405562, 72.98532880014861, 72.80816628135628, 72.66704940830257, 72.5358130305471, 72.39973848211213, 72.25120115990799, 72.09051273733056, 71.91915576841821, 71.74179912841872, 71.5828685558551, 71.44164290275731, 71.31141953649379, 71.1749720104845, 71.01540275470833, 70.8123434631645, 70.5404191743203, 70.18474615596438, 69.73712308790341, 69.2025972387103, 68.59777286123517, 67.94032877033857, 67.26080629661743, 66.5932883755332, 65.9609184058177, 65.39738882146094, 64.89844194006452, 64.46395670732434, 64.0944311055124, 63.782656327503744, 63.51467521443324, 63.27438083493269, 63.0489597129483, 62.83783898527295, 62.618860930337576, 62.381029907310584, 62.1011982463269, 61.77955700939512, 61.40659976240387, 60.96326340743294, 60.45681426191362, 59.89822911128723, 59.29079670792521, 58.64794215596113, 58.00319200182595, 57.38325738562404, 56.81168421651288, 56.31691835032012, 55.910898496386395, 55.57914374590049, 55.29990853607242, 55.058766073932055, 54.83981790781787, 54.613533948963166, 54.35489282798701, 54.055062888044695, 53.7155590544642, 53.34330562760425, 52.952127661499986, 52.55551819471884, 52.16764439866712, 51.819657549702654, 51.50682038899218, 51.22474271664658, 50.95146565075167, 50.66738164019026, 50.35470689183471, 49.988160082843535, 49.55784489999851, 49.04305107792927, 48.462467758118315, 47.84734910569046, 47.21545476633142, 46.592993740305275, 46.00523911702882, 45.48428366682505, 45.04051138337152, 44.68708992787317, 44.410814036717184, 44.1851423884766, 43.99312139288887, 43.81897349400734, 43.63873885449706, 43.42902223965496, 43.16065912845092, 42.83689286955449, 42.471907010436745, 42.06360545954762, 41.61198004874279, 41.110425120211914, 40.5785418640243, 40.035456696998054, 39.484108537275404, 38.9264207181555, 38.38432632243226, 37.88606816142475, 37.44816706282286, 37.082840779421005, 36.810339461082705, 36.63892526633333, 36.56779543410205, 36.602128232375804, 36.716442620449236, 36.885249857949724, 37.06908424033985, 37.237707096721806, 37.360337134855456, 37.40381195504023, 37.35325781244681, 37.191233882160944, 36.92751292090871, 36.58864658277108, 36.19734616896574, 35.78054156534461, 35.36769286247899, 34.98819626916614, 34.66955085724871, 34.41683639967786, 34.22603232457439, 34.08882601771951, 33.989224464969, 33.91292496617274, 33.83719687229383, 33.74221667304354, 33.615682238203156, 33.45112769370161, 33.25561420505714, 33.02541219453953, 32.77704134873633, 32.517585711512695, 32.25548177157811, 32.003730799711704, 31.768383722058516, 31.549999612848836, 31.348440794335847, 31.163608911728495, 30.99974683411229, 30.860571464954823, 30.747026000035167, 30.658323580392146, 30.596652426732152, 30.56705557040322, 30.571755185002168, 30.60185494167009, 30.646462579774713, 30.69659717362897, 30.747267098453754, 30.78907650622952, 30.808069745910625, 30.804703077089204, 30.784809518079012, 30.75013054414432, 30.709681825784156, 30.66963899394984, 30.636314166704828, 30.616283741496563, 30.615611972746347, 30.63415356268191, 30.663830975882206, 30.702874596104664, 30.739845297450124, 30.769248221920108, 30.78397699925472, 30.77504427566356, 30.744587419824963, 30.693714120726305, 30.633321632912377, 30.572670939929726, 30.52271021432795, 30.48280368194768, 30.463184980858713, 30.4762408361906, 30.519777921373, 30.586620536476563, 30.66632671663543, 30.755503746239725, 30.840796088385808, 30.914475227730914, 30.966187234911935, 30.98970253708127, 30.98778909162607, 30.963024571879586, 30.914291886729167, 30.847405860648294, 30.768011433831226, 30.68257004952665, 30.594720744437343, 30.512006091988503, 30.436464738212223, 30.37081692455661, 30.320091199709506, 30.28230905668751, 30.257543273183572], "noise": 31.257239901657236, "v_count": 32, "h1_count": 3, "h2_count": 5, "r_test": 3.950000108625003, "d_test": 25.92404992, "fov": { "p0": { "x": 500, "y": -70 }, "p1": null, "theta": 56, "radius_one": 129, "radius_two": 524 }, "cyst_one": { "x": 480, "y": 84 }, "pin_one": { "x": 500, "y": 84 }, "v_pins": [{ "vertical": null, "lateral": null, "elevation": null, "axial": null, "p": null, "pin_num": 1, "pos": null, "is_ref": false }, { "vertical": null, "lateral": null, "elevation": null, "axial": null, "p": null, "pin_num": 2, "pos": null, "is_ref": false }, { "vertical": null, "lateral": null, "elevation": null, "axial": null, "p": null, "pin_num": 3, "pos": null, "is_ref": false }, { "vertical": null, "lateral": null, "elevation": null, "axial": null, "p": null, "pin_num": 4, "pos": null, "is_ref": false }, { "vertical": null, "lateral": null, "elevation": null, "axial": null, "p": null, "pin_num": 5, "pos": null, "is_ref": false }, { "vertical": 0.0, "lateral": 0.24805266156172748, "elevation": null, "axial": 0.2841916113947978, "p": 1.999978356230637, "pin_num": 6, "pos": null, "is_ref": true }, { "vertical": 0.48034596048694844, "lateral": null, "elevation": 0.6432881934737421, "axial": 0.191040460645581, "p": 1.63403159768422, "pin_num": 7, "pos": null, "is_ref": false }, { "vertical": 0.96202529, "lateral": 0.2204959725411904, "elevation": null, "axial": 0.1846801571708298, "p": 2.6047600315003008, "pin_num": 8, "pos": null, "is_ref": false }, { "vertical": 1.4213335151025122, "lateral": null, "elevation": 0.8774652362335852, "axial": 0.19745142586990633, "p": 1.9116494801386628, "pin_num": 9, "pos": null, "is_ref": false }, { "vertical": 1.92405058, "lateral": 0.24636537820760052, "elevation": null, "axial": 0.18957316459709259, "p": 2.786699729161475, "pin_num": 10, "pos": null, "is_ref": false }, { "vertical": 2.3819003874271707, "lateral": null, "elevation": 0.7084526207176568, "axial": 0.18423519223863594, "p": 2.1852041530200497, "pin_num": 11, "pos": null, "is_ref": false }, { "vertical": 2.88607587, "lateral": 0.28623014207421943, "elevation": null, "axial": 0.17778042064247088, "p": 2.3747174539561513, "pin_num": 12, "pos": null, "is_ref": false }, { "vertical": 3.3939160636027776, "lateral": null, "elevation": 0.289629297393437, "axial": 0.17809026996043426, "p": 2.645169218569517, "pin_num": 13, "pos": null, "is_ref": false }, { "vertical": 3.89873407, "lateral": 0.3503520032067459, "elevation": null, "axial": 0.220129053830825, "p": 2.2234509744248396, "pin_num": 14, "pos": null, "is_ref": false }, { "vertical": 4.40506317, "lateral": null, "elevation": 0.4601132731668015, "axial": 0.21107439648265866, "p": 2.021443559758648, "pin_num": 15, "pos": null, "is_ref": false }, { "vertical": 4.86102306591963, "lateral": 0.4235841640681883, "elevation": null, "axial": 0.18889856280876635, "p": 1.773928721068154, "pin_num": 16, "pos": null, "is_ref": false }, { "vertical": 5.3680437129149245, "lateral": null, "elevation": 0.609165884836127, "axial": 0.16774015655608437, "p": 2.2477991540068114, "pin_num": 17, "pos": null, "is_ref": false }, { "vertical": 5.87363580124708, "lateral": 0.4957669883454678, "elevation": null, "axial": 0.1825848289578176, "p": 1.7990631679111042, "pin_num": 18, "pos": null, "is_ref": false }, { "vertical": 6.37974666, "lateral": null, "elevation": 0.5906263699308173, "axial": 0.17815009280061478, "p": 1.7766249572695174, "pin_num": 19, "pos": null, "is_ref": false }, { "vertical": 6.886075760000001, "lateral": 0.5691344544251862, "elevation": null, "axial": 0.17142728082791936, "p": 1.8809987512597255, "pin_num": 20, "pos": null, "is_ref": false }, { "vertical": 7.39240486, "lateral": null, "elevation": 0.6364740956902016, "axial": 0.16345330741633848, "p": 1.7296299100589094, "pin_num": 21, "pos": null, "is_ref": false }, { "vertical": 7.89873396, "lateral": 0.8208836210646477, "elevation": null, "axial": 0.20335339123153665, "p": 1.6283652870194367, "pin_num": 22, "pos": null, "is_ref": false }, { "vertical": 8.405215567381461, "lateral": null, "elevation": 2.115303230399131, "axial": 0.17129852145162167, "p": 1.7051998459261, "pin_num": 23, "pos": null, "is_ref": false }, { "vertical": 8.911967515403642, "lateral": 0.8919236263996564, "elevation": null, "axial": 0.20113001681569212, "p": 1.5427367026644567, "pin_num": 24, "pos": null, "is_ref": false }, { "vertical": 9.417857368989566, "lateral": null, "elevation": 1.117430980076389, "axial": 0.1801327038360802, "p": 1.6744305075081356, "pin_num": 25, "pos": null, "is_ref": false }, { "vertical": 9.92405036, "lateral": 0.7230959447274815, "elevation": null, "axial": 0.15503354404481365, "p": 1.7539769393117337, "pin_num": 26, "pos": null, "is_ref": false }, { "vertical": 10.431485460075448, "lateral": null, "elevation": 1.8861587735594851, "axial": 0.1490897730338212, "p": 1.719000263541085, "pin_num": 27, "pos": null, "is_ref": false }, { "vertical": 10.937177373192663, "lateral": 1.2096497854279555, "elevation": null, "axial": 0.16994856171363518, "p": 1.7395582617399783, "pin_num": 28, "pos": null, "is_ref": false }, { "vertical": 11.444045793003186, "lateral": null, "elevation": 2.23497128949407, "axial": 0.17736214888397123, "p": 1.6529057355596466, "pin_num": 29, "pos": null, "is_ref": false }, { "vertical": 11.950332179030362, "lateral": 2.11991716428539, "elevation": null, "axial": 0.1652744958384428, "p": 1.6329188098469511, "pin_num": 30, "pos": null, "is_ref": false }, { "vertical": 12.45569586, "lateral": null, "elevation": 1.7750556392681798, "axial": 0.1555838716069482, "p": 1.5936328941412474, "pin_num": 31, "pos": null, "is_ref": false }, { "vertical": 12.962123852025103, "lateral": 0.8609844757468895, "elevation": null, "axial": 0.20404324991130313, "p": 1.5345756861522029, "pin_num": 32, "pos": null, "is_ref": false }], "h_pins": { "row_one": [{ "p": 2.5716769651826485, "pin_num": 1, "pos": null, "is_ref": false, "horizontal": 1.5189873 }, { "p": 2.645165199978356, "pin_num": 2, "pos": { "x": 499, "y": 104 }, "is_ref": true, "horizontal": 0.0 }, { "p": 0.0, "pin_num": 3, "pos": null, "is_ref": false, "horizontal": 1.46835439 }], "row_two": [{ "p": 1.7175017639263679, "pin_num": 1, "pos": null, "is_ref": false, "horizontal": 3.848434256833344 }, { "p": 1.7556626835148543, "pin_num": 2, "pos": null, "is_ref": false, "horizontal": 1.92405058 }, { "p": 1.5898711707925395, "pin_num": 3, "pos": { "x": 499, "y": 241 }, "is_ref": false, "horizontal": 0 }, { "p": 1.6761253725956904, "pin_num": 4, "pos": null, "is_ref": false, "horizontal": 2.0253164000000003 }, { "p": 1.8524261064302585, "pin_num": 5, "pos": null, "is_ref": false, "horizontal": 4.15189862 }] }, "cysts": [{ "6 mm": { "c": 0.35510093483267846, "l": -2.63756181578084, "center": { "x": 527, "y": 84 } }, "4 mm": { "c": 0.5718970348246452, "l": -1.5773985971938842, "center": { "x": 509, "y": 83 } }, "2 mm": { "c": 0.7710655378997088, "l": -3.209614267050724, "center": { "x": 480, "y": 84 } }, "depth": 1.5 }, { "6 mm": { "c": 0.29888712241653426, "l": -1.1823431699779727, "center": { "x": 529, "y": 123 } }, "4 mm": { "c": 0.41742964157519635, "l": -3.487506652925463, "center": { "x": 509, "y": 123 } }, "2 mm": { "c": 0.6756441736044145, "l": -4.916129091424894, "center": { "x": 480, "y": 123 } }, "depth": 3.5 }, { "6 mm": { "c": 0.23074995301046286, "l": -1.2360301310952355, "center": { "x": 528, "y": 162 } }, "4 mm": { "c": 0.34628320925135114, "l": -1.7798293735261352, "center": { "x": 509, "y": 162 } }, "2 mm": { "c": 0.5783841146977049, "l": -3.158151672767145, "center": { "x": 480, "y": 162 } }, "depth": 5.5 }, { "6 mm": { "c": 0.28409090909090906, "l": -1.338199246019724, "center": { "x": 528, "y": 201 } }, "4 mm": { "c": 0.25279134491575816, "l": -1.3016938797005158, "center": { "x": 509, "y": 201 } }, "2 mm": { "c": 0.42849808058555583, "l": -2.0218289568436143, "center": { "x": 480, "y": 201 } }, "depth": 7.5 }, { "6 mm": { "c": 0.3642798051291479, "l": -1.553578139623939, "center": { "x": 529, "y": 242 } }, "4 mm": { "c": 0.21254242110183108, "l": -0.8356406861186628, "center": { "x": 510, "y": 242 } }, "2 mm": { "c": 0.4181169971664638, "l": -1.416039300453731, "center": { "x": 481, "y": 241 } }, "depth": 9.5 }, { "6 mm": { "c": 0.3441779058993101, "l": -1.4263003279994007, "center": { "x": 531, "y": 282 } }, "4 mm": { "c": 0.32447515280361416, "l": -0.8570362727480678, "center": { "x": 513, "y": 281 } }, "2 mm": { "c": 0.37128865469730543, "l": -1.0105755729211527, "center": { "x": 480, "y": 281 } }, "depth": 11.5 }, { "6 mm": { "c": 0.3900514579759863, "l": -1.4401973404380335, "center": { "x": 535, "y": 321 } }, "4 mm": { "c": 0.32455051174667315, "l": -1.0543574630268406, "center": { "x": 514, "y": 321 } }, "2 mm": { "c": 0.3898378906314445, "l": -1.0961232872594442, "center": { "x": 481, "y": 321 } }, "depth": 13.5 }]
  }


  getScanner() {
    const scanner1 = [
      {
        "id": '1',
        "make": "GE Logiq: L12345678",
        "model": "GE Logiq: L12345678",
        "facility": "CIRS",
        "room": "RM1",
        "barcode": "123456",
        "serial_number": "12345",
        "next_study_due": {
          "date": "07/09/2021",
          "type": "Quarterly"
        },
        "last_study": {
          "id": "4b684df6-d0d0-4634-a5bb-7fa2e52a5df4",
          "type": "Quarterly",
          "finalized": true,
          "date_performed": "2021-9-20",
          "assessment": "pass",
          "data": {
            "physical": [
              {
                "assessment": "pass",
                "display_name": "Control Panel",
                "img": "",
                "notes": []
              },
              {
                "assessment": "fail",
                "display_name": "Wheels",
                "img": "",
                "notes": []
              },
              {
                "assessment": "fail",
                "display_name": "Cords",
                "img": "https://coolimages.com/384784936",
                "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
              },
              {
                "assessment": "pass",
                "display_name": "Air Filter",
                "img": "",
                "notes": []
              }
            ],
            "display": [
              {
                "assessment": "fail",
                "display_name": "Visible Transitions",
                "img": "",
                "notes": []
              },
              {
                "assessment": "fail",
                "display_name": "Distinct Line Pairs",
                "img": "",
                "notes": []
              },
              {
                "assessment": "pass",
                "display_name": "Smooth Greyscale",
                "img": "",
                "notes": []
              },
              {
                "assessment": "fail",
                "display_name": "Consistent with PACS",
                "img": "",
                "notes": []
              }
            ]
          }
        },
        "transducers": [{
          "id": '1',
          "make": "C26:L1q237",
          "model": "C26:L1q237",
          "facility": "CIRS",
          "room": "RM1",
          "barcode": "123456",
          "serial_number": "123456",
          "next_study_due": {
            "date": "ISO 8601",
            "type": "Quarterly"
          },
          "last_study": {
            "id": '36f483cd-99fb-494d-a8e0-8ee1f75ddb10',
            "type": 'annual',
            "finalized": false,
            "date_performed": '2021-07-10',
            "assessment": "none",
            "data": {
              "physical": [
                {
                  "assessment": "pass",
                  "display_name": "Cables",
                  "img": "",
                  "notes": []
                }, {
                  "assessment": "pass",
                  "display_name": "Cracks/Discoloration",
                  "img": "",
                  "notes": []
                }, {
                  "assessment": "fail",
                  "display_name": "Connectors",
                  "img": "https://www.fathom.com/img/934322856",
                  "notes": [
                    {
                      "timestamp": "2021-7-10T12:28",
                      "type": "eval",
                      "text": "Connector loose; falls out if bumped"
                    }
                  ]
                }
              ],
              "image": "https://www.fathom.com/img/567822856",
              "uniformity": "",
              "imaging": {
                "sensitivity": "",
                "vertical_distance": [
                  {
                    "unit": "cm",
                    "display_name": "1",
                    "baseline": -1.3,
                    "measured": -1.2,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "2",
                    "baseline": -1.1,
                    "measured": -1.0,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "3",
                    "baseline": -0.9,
                    "measured": -0.8,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "4",
                    "baseline": -0.7,
                    "measured": -0.6,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "5",
                    "baseline": -0.5,
                    "measured": -0.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "6",
                    "baseline": 0,
                    "measured": 0,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "7",
                    "baseline": 0.5,
                    "measured": 0.5,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "8",
                    "baseline": 1.0,
                    "measured": 1.0,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "9",
                    "baseline": 1.5,
                    "measured": 1.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "10",
                    "baseline": 2.0,
                    "measured": 1.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "11",
                    "baseline": 2.5,
                    "measured": 2.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "12",
                    "baseline": 3.0,
                    "measured": 2.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "13",
                    "baseline": 3.5,
                    "measured": 3.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "14",
                    "baseline": 4.0,
                    "measured": 3.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "15",
                    "baseline": 4.5,
                    "measured": 4.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "16",
                    "baseline": 5.0,
                    "measured": 4.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "17",
                    "baseline": 5.5,
                    "measured": 5.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "18",
                    "baseline": 6.0,
                    "measured": 5.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "19",
                    "baseline": 6.5,
                    "measured": 6.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "20",
                    "baseline": 1.0,
                    "measured": 6.9,
                    "tolerance": "",
                  },
                ],
                "horizontal_distance": {
                  "row_one": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": -1.45,
                      "measured": -1.5,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0,
                      "measured": 0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": 1.47,
                      "measured": 1.5,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": "",
                      "measured": "",
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": "",
                      "measured": "",
                      "tolerance": "",
                    }
                  ],
                  "row_two": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": -4,
                      "measured": -3.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": -2.0,
                      "measured": -2.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": 0,
                      "measured": 0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 2.1,
                      "measured": 2.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": 4.1,
                      "measured": 4.0,
                      "tolerance": "",
                    }
                  ],
                },
                "axial_resolution": [
                  {
                    "unit": "cm",
                    "display_name": "2",
                    "baseline": 0.15,
                    "measured": 0.17,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "4",
                    "baseline": 0.13,
                    "measured": 0.14,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "6",
                    "baseline": 0.13,
                    "measured": 0.13,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "8",
                    "baseline": 0.12,
                    "measured": 0.11,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "10",
                    "baseline": 0.11,
                    "measured": 0.11,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "12",
                    "baseline": 0.11,
                    "measured": 0.10,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "14",
                    "baseline": 0.10,
                    "measured": 0.09,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "16",
                    "baseline": 0.09,
                    "measured": 0.09,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "18",
                    "baseline": 0.09,
                    "measured": 0.10,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "20",
                    "baseline": 0.08,
                    "measured": 0.08,
                    "tolerance": "",
                  }
                ],
                "lateral_resolution": [
                  {
                    "unit": "cm",
                    "display_name": "2",
                    "baseline": 0.07,
                    "measured": 0.07,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "4",
                    "baseline": 0.07,
                    "measured": 0.08,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "6",
                    "baseline": 0.06,
                    "measured": 0.07,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "8",
                    "baseline": 0.08,
                    "measured": 0.08,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "10",
                    "baseline": 0.07,
                    "measured": 0.09,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "12",
                    "baseline": 0.08,
                    "measured": 0.07,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "14",
                    "baseline": 0.07,
                    "measured": 0.08,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "16",
                    "baseline": 0.07,
                    "measured": 0.07,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "18",
                    "baseline": 0.06,
                    "measured": 0.06,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "20",
                    "baseline": 0.06,
                    "measured": 0.06,
                    "tolerance": "",
                  }
                ],
                "elevational_resolution": [
                  {
                    "unit": "cm",
                    "display_name": "1",
                    "baseline": 0.25,
                    "measured": 0.27,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "3",
                    "baseline": 0.23,
                    "measured": 0.24,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "5",
                    "baseline": 0.23,
                    "measured": 0.23,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "7",
                    "baseline": 0.22,
                    "measured": 0.21,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "9",
                    "baseline": 0.21,
                    "measured": 0.21,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "11",
                    "baseline": 0.21,
                    "measured": 0.21,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "13",
                    "baseline": 0.20,
                    "measured": 0.19,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "15",
                    "baseline": 0.19,
                    "measured": 0.19,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "17",
                    "baseline": 0.19,
                    "measured": 0.20,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "19",
                    "baseline": 0.18,
                    "measured": 0.18,
                    "tolerance": "",
                  }
                ],

                "contrast_resolution": [],
              }
            }
          }

        }]
      },
      {
        "id": '2',
        "make": "Philips: M12345678",
        "model": "Philips: M12345678",
        "facility": "Fathom",
        "room": "RM2",
        "barcode": "123456",
        "serial_number": "45678",
        "next_study_due": {
          "date": "09/01/2021",
          "type": "Annual"
        },
        "last_study": {
          "id": "4b684df6-d0d0-4634-a5bb-7fa2e52a5df5",
          "type": "Annual",
          "finalized": false,
          "date_performed": "2021-9-20",
          "assessment": "pass",
          "data":
          {
            "physical": [
              {
                "assessment": "pass",
                "display_name": "Control Panel",
                "img": "",
                "notes": []
              },
              {
                "assessment": "fail",
                "display_name": "Wheels",
                "img": "",
                "notes": []
              },
              {
                "assessment": "fail",
                "display_name": "Cords",
                "img": "https://coolimages.com/384784936",
                "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
              },
              {
                "assessment": "pass",
                "display_name": "Air Filter",
                "img": "",
                "notes": []
              }
            ],


            "display": [
              {
                "assessment": "pass",
                "display_name": "Visible Transitions",
                "img": "",
                "notes": []
              },
              {
                "assessment": "pass",
                "display_name": "Distinct Line Pairs",
                "img": "",
                "notes": []
              },
              {
                "assessment": "pass",
                "display_name": "Smooth Greyscale",
                "img": "",
                "notes": []
              },
              {
                "assessment": "fail",
                "display_name": "Consistent with PACS",
                "img": "",
                "notes": []
              }
            ]
          }

        },
        "transducers": [
          {
            "id": '2',
            "make": "C26:L1q234",
            "model": "C26:L1q234",
            "facility": "CIRS",
            "room": "RM1",
            "barcode": "123456",
            "serial_number": "123455",
            "next_study_due": {
              "date": "ISO 8601",
              "type": "Annual"
            },
            "last_study": {
              "id": '36f483cd-99fb-494d-a8e0-8ee1f75ddb11',
              "type": 'annual',
              "finalized": false,
              "date_performed": '2021-07-10',
              "assessment": "none",
              "data": {
                "physical": [
                  {
                    "assessment": "pass",
                    "display_name": "Cables",
                    "img": "",
                    "notes": []
                  }, {
                    "assessment": "pass",
                    "display_name": "Cracks/Discoloration",
                    "img": "",
                    "notes": []
                  }, {
                    "assessment": "fail",
                    "display_name": "Connectors",
                    "img": "https://www.fathom.com/img/934322856",
                    "notes": [
                      {
                        "timestamp": "2021-7-10T12:28",
                        "type": "eval",
                        "text": "Connector loose; falls out if bumped"
                      }
                    ]
                  }
                ],
                "image": "https://www.fathom.com/img/567822856",
                "uniformity": "",
                "imaging": {
                  "sensitivity": "",
                  "vertical_distance": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": -1.3,
                      "measured": -1.2,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": -1.1,
                      "measured": -1.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": -0.9,
                      "measured": -0.8,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": -0.7,
                      "measured": -0.6,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": -0.5,
                      "measured": -0.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0,
                      "measured": 0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "7",
                      "baseline": 0.5,
                      "measured": 0.5,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 1.0,
                      "measured": 1.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "9",
                      "baseline": 1.5,
                      "measured": 1.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 2.0,
                      "measured": 1.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "11",
                      "baseline": 2.5,
                      "measured": 2.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 3.0,
                      "measured": 2.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "13",
                      "baseline": 3.5,
                      "measured": 3.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 4.0,
                      "measured": 3.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "15",
                      "baseline": 4.5,
                      "measured": 4.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 5.0,
                      "measured": 4.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "17",
                      "baseline": 5.5,
                      "measured": 5.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 6.0,
                      "measured": 5.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "19",
                      "baseline": 6.5,
                      "measured": 6.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 7.0,
                      "measured": 6.9,
                      "tolerance": "",
                    },
                  ],
                  "horizontal_distance": {
                    "row_one": [
                      {
                        "unit": "cm",
                        "display_name": "1",
                        "baseline": -1.45,
                        "measured": -1.5,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "2",
                        "baseline": 0,
                        "measured": 0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "3",
                        "baseline": 1.47,
                        "measured": 1.5,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "4",
                        "baseline": "",
                        "measured": "",
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "5",
                        "baseline": "",
                        "measured": "",
                        "tolerance": "",
                      }
                    ],
                    "row_two": [
                      {
                        "unit": "cm",
                        "display_name": "1",
                        "baseline": -4,
                        "measured": -3.9,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "2",
                        "baseline": -2.0,
                        "measured": -2.0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "3",
                        "baseline": 0,
                        "measured": 0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "4",
                        "baseline": 2.1,
                        "measured": 2.0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "5",
                        "baseline": 4.1,
                        "measured": 4.0,
                        "tolerance": "",
                      }
                    ],
                  },
                  "axial_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0.15,
                      "measured": 0.17,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 0.13,
                      "measured": 0.14,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0.13,
                      "measured": 0.13,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 0.12,
                      "measured": 0.11,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 0.11,
                      "measured": 0.11,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 0.11,
                      "measured": 0.10,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 0.10,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 0.09,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 0.09,
                      "measured": 0.10,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 0.08,
                      "measured": 0.08,
                      "tolerance": "",
                    }
                  ],
                  "lateral_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0.07,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 0.07,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0.06,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 0.08,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 0.07,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 0.08,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 0.07,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 0.07,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 0.06,
                      "measured": 0.06,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 0.06,
                      "measured": 0.06,
                      "tolerance": "",
                    }
                  ],
                  "elevational_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": 0.25,
                      "measured": 0.27,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": 0.23,
                      "measured": 0.24,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": 0.23,
                      "measured": 0.23,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "7",
                      "baseline": 0.22,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "9",
                      "baseline": 0.21,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "11",
                      "baseline": 0.21,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "13",
                      "baseline": 0.20,
                      "measured": 0.19,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "15",
                      "baseline": 0.19,
                      "measured": 0.19,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "17",
                      "baseline": 0.19,
                      "measured": 0.20,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "19",
                      "baseline": 0.18,
                      "measured": 0.18,
                      "tolerance": "",
                    }
                  ],

                  "contrast_resolution": [],
                }
              }
            }
          }]
      },
      {
        "id": '3',
        "make": "GE Logiq1",
        "model": "GE Logiq1",
        "facility": "CIRS",
        "room": "RM3",
        "barcode": "123456",
        "serial_number": "78945",
        "next_study_due": {
          "date": "ISO 8601",
          "type": "Acceptance"
        },
        "last_study": {
          "id": "4b684df6-d0d0-4634-a5bb-7fa2e52a5df6",
          "type": "Acceptance",
          "finalized": false,
          "date_performed": "2021-9-20",
          "assessment": "pass",
          "data":
          {
            "physical": [
              {
                "assessment": "pass",
                "display_name": "Control Panel",
                "img": "",
                "notes": []
              },
              {
                "assessment": "pass",
                "display_name": "Wheels",
                "img": "",
                "notes": []
              },
              {
                "assessment": "fail",
                "display_name": "Cords",
                "img": "https://coolimages.com/384784936",
                "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
              },
              {
                "assessment": "pass",
                "display_name": "Air Filter",
                "img": "",
                "notes": []
              }
            ],
            "display": [
              {
                "assessment": "pass",
                "display_name": "Visible Transitions",
                "img": "",
                "notes": []
              },
              {
                "assessment": "pass",
                "display_name": "Distinct Line Pairs",
                "img": "",
                "notes": []
              },
              {
                "assessment": "pass",
                "display_name": "Smooth Greyscale",
                "img": "",
                "notes": []
              },
              {
                "assessment": "pass",
                "display_name": "Consistent with PACS",
                "img": "",
                "notes": []
              }
            ]
          }
        },
        "transducers": [
          {
            "id": '4',
            "make": "C26:L1q236",
            "model": "C26:L1q236",
            "facility": "CIRS",
            "room": "RM1",
            "barcode": "123456",
            "serial_number": "123451",
            "next_study_due": {
              "date": "ISO 8601",
              "type": "Acceptance"
            },
            "last_study": {
              "id": '36f483cd-99fb-494d-a8e0-8ee1f75ddb12',
              "type": 'annual',
              "finalized": false,
              "date_performed": '2021-07-10',
              "assessment": "none",
              "data": {
                "physical": [
                  {
                    "assessment": "pass",
                    "display_name": "Cables",
                    "img": "",
                    "notes": []
                  }, {
                    "assessment": "pass",
                    "display_name": "Cracks/Discoloration",
                    "img": "",
                    "notes": []
                  }, {
                    "assessment": "fail",
                    "display_name": "Connectors",
                    "img": "https://www.fathom.com/img/934322856",
                    "notes": [
                      {
                        "timestamp": "2021-7-10T12:28",
                        "type": "eval",
                        "text": "Connector loose; falls out if bumped"
                      }
                    ]
                  }
                ],
                "image": "https://www.fathom.com/img/567822856",
                "uniformity": "",
                "imaging": {
                  "sensitivity": "",
                  "vertical_distance": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": -1.3,
                      "measured": -1.2,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": -1.1,
                      "measured": -1.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": -0.9,
                      "measured": -0.8,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": -0.7,
                      "measured": -0.6,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": -0.5,
                      "measured": -0.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0,
                      "measured": 0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "7",
                      "baseline": 0.5,
                      "measured": 0.5,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 1.0,
                      "measured": 1.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "9",
                      "baseline": 1.5,
                      "measured": 1.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 2.0,
                      "measured": 1.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "11",
                      "baseline": 2.5,
                      "measured": 2.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 3.0,
                      "measured": 2.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "13",
                      "baseline": 3.5,
                      "measured": 3.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 4.0,
                      "measured": 3.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "15",
                      "baseline": 4.5,
                      "measured": 4.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 5.0,
                      "measured": 4.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "17",
                      "baseline": 5.5,
                      "measured": 5.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 6.0,
                      "measured": 5.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "19",
                      "baseline": 6.5,
                      "measured": 6.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 7.0,
                      "measured": 6.9,
                      "tolerance": "",
                    },
                  ],
                  "horizontal_distance": {
                    "row_one": [
                      {
                        "unit": "cm",
                        "display_name": "1",
                        "baseline": -1.45,
                        "measured": -1.5,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "2",
                        "baseline": 0,
                        "measured": 0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "3",
                        "baseline": 1.47,
                        "measured": 1.5,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "4",
                        "baseline": "",
                        "measured": "",
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "5",
                        "baseline": "",
                        "measured": "",
                        "tolerance": "",
                      }
                    ],
                    "row_two": [
                      {
                        "unit": "cm",
                        "display_name": "1",
                        "baseline": -4,
                        "measured": -3.9,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "2",
                        "baseline": -2.0,
                        "measured": -2.0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "3",
                        "baseline": 0,
                        "measured": 0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "4",
                        "baseline": 2.1,
                        "measured": 2.0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "5",
                        "baseline": 4.1,
                        "measured": 4.0,
                        "tolerance": "",
                      }
                    ],
                  },
                  "axial_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0.15,
                      "measured": 0.17,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 0.13,
                      "measured": 0.14,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0.13,
                      "measured": 0.13,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 0.12,
                      "measured": 0.11,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 0.11,
                      "measured": 0.11,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 0.11,
                      "measured": 0.10,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 0.10,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 0.09,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 0.09,
                      "measured": 0.10,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 0.08,
                      "measured": 0.08,
                      "tolerance": "",
                    }
                  ],
                  "lateral_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0.07,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 0.07,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0.06,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 0.08,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 0.07,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 0.08,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 0.07,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 0.07,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 0.06,
                      "measured": 0.06,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 0.06,
                      "measured": 0.06,
                      "tolerance": "",
                    }
                  ],
                  "elevational_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": 0.25,
                      "measured": 0.27,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": 0.23,
                      "measured": 0.24,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": 0.23,
                      "measured": 0.23,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "7",
                      "baseline": 0.22,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "9",
                      "baseline": 0.21,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "11",
                      "baseline": 0.21,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "13",
                      "baseline": 0.20,
                      "measured": 0.19,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "15",
                      "baseline": 0.19,
                      "measured": 0.19,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "17",
                      "baseline": 0.19,
                      "measured": 0.20,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "19",
                      "baseline": 0.18,
                      "measured": 0.18,
                      "tolerance": "",
                    }
                  ],

                  "contrast_resolution": [],
                }
              }
            }
          }]
      }
    ];
    return scanner1;
  }

  addScanner(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'scanner', data);
  }

  getScanners(): Observable<any> {
    return this.http.get(environment.api_url + 'scanner');
  }

  deleteScanner(scannerId: any): Observable<any> {
     return this.http.delete(environment.api_url + 'scanner/' + scannerId);
  }

  getAllTransducer(): Observable<any> {
    return this.http.get(environment.api_url + '/transducer');
  }

  addTranducer(data: any): Observable<any> {
    return this.http.post(environment.api_url + '/transducer', data);
  }

  deleteTranducer(id: any): Observable<any> {
    return this.http.delete(environment.api_url + '/transducer/' + id);
  }

  getAllScanner(): Observable<any> {
    return this.http.get(environment.api_Url); 
  }

  getStudyList(): Observable<any> {
    return this.http.get('assets/studyData.json');
  }

  getGraphList(): Observable<any> {
    return this.http.get('assets/weather-data.json');
  }

  studieScanner(scannerId: any): Observable<any> {
    return this.http.get(environment.api_url + "scanner/"+ scannerId +"/studies");
 }

}

