/* IELTS module content, part 1: reading passages and listening scripts. All texts are original, written for practice (not official test material). */
const IELTS={read:[],listen:[],w1:[],w2:[],s1:[],s2:[]};
const TF=(q,a,e)=>({t:'tfng',q,a,e});
const FL=(q,a,alt,e)=>({t:'fill',q,a,alt:alt||[],e});
const MC=(q,o,a,e)=>({t:'mcq',q,o,a,e});
IELTS.read.push(
{id:'r1',title:'The long road to the modern bicycle',min:20,
paras:[
['A',"The bicycle looks so simple that it is easy to forget how long it took to invent. In 1817 the German baron Karl von Drais built a wooden machine with two wheels set in line and a steerable front wheel. It had no pedals: the rider sat astride the frame and pushed along the ground with his feet. The machine was admired as a curiosity, and some towns restricted its use on pavements, but on the rough roads of the time it never became a practical form of transport."],
['B',"Progress came in the 1860s, when French makers fitted cranks and pedals directly to the front wheel. This 'velocipede' let riders keep their feet off the ground, but its wooden frame and iron-rimmed wheels transmitted every bump to the rider, and it soon earned the nickname 'boneshaker'. It was fashionable in the cities of Europe for a few years, yet few people rode one for pleasure over any distance."],
['C',"In the 1870s designers found a way to increase speed. Because the wheel turned once for each turn of the pedals, a larger front wheel carried the rider further with every turn. The 'high-wheeler', later nicknamed the penny-farthing, had a front wheel more than a metre and a half across and a tiny rear wheel. It was fast, and clubs of young men raced it, but the rider sat high above the ground, and a sudden stop could throw him forward over the handlebars, a fall known at the time as 'taking a header'."],
['D',"The solution came in 1885, when John Kemp Starley produced the Rover 'safety bicycle'. Its two wheels were almost the same size, the rider sat low between them, and a chain carried power from the pedals to the rear wheel. Three years later the Scottish veterinary surgeon John Boyd Dunlop developed the pneumatic tyre, filled with air, which absorbed the shocks of the road and allowed higher speeds with far less effort. The basic shape of the bicycle has changed very little since."],
['E',"By the 1890s the bicycle had become a mass product, and its effects reached well beyond sport. Workers could live further from the factory, and some campaigners for women's rights argued that cycling gave women a new independence, since they could travel alone without a horse or a driver. The factories that made bicycles also developed techniques of precision manufacture and standard parts that were later used in the first motor cars and even aircraft: the Wright brothers, for example, ran a bicycle workshop before they built their aeroplane."]
],
opts:{h:['i. A dangerous kind of speed','ii. A machine without pedals','iii. Cycling and social change','iv. Pedals arrive, but comfort does not','v. The design that lasted','vi. A modern revival']},
qs:[
TF("Von Drais's machine was fitted with pedals.",'F',"Paragraph A: it had no pedals; the rider pushed with his feet."),
TF("The velocipede was a comfortable machine to ride.",'F',"Paragraph B: it transmitted every bump and was nicknamed 'boneshaker'."),
TF("High-wheelers were more popular with women than with men.",'NG',"The text says young men raced them but gives no comparison with women."),
TF("Starley's safety bicycle used a chain to drive the rear wheel.",'T',"Paragraph D: a chain carried power to the rear wheel."),
FL("Riders of Drais's machine moved forward by pushing with their ____ (one word).",'feet',['foot'],"Paragraph A: 'pushed along the ground with his feet'."),
FL("A large front wheel carried the rider further with every ____ (two words).",'pedal turn',['turn of the pedals','turn of the pedal','pedal revolution','turn of pedals'],"Paragraph C: 'further with every turn' of the pedals."),
FL("Dunlop developed the ____ tyre in 1888 (one word).",'pneumatic',['air-filled'],"Paragraph D."),
MC("Choose the heading for paragraph B.",['i. A dangerous kind of speed','ii. A machine without pedals','iii. Cycling and social change','iv. Pedals arrive, but comfort does not','v. The design that lasted','vi. A modern revival'],3,"B describes the velocipede: pedals, but a rough ride."),
MC("Choose the heading for paragraph C.",['i. A dangerous kind of speed','ii. A machine without pedals','iii. Cycling and social change','iv. Pedals arrive, but comfort does not','v. The design that lasted','vi. A modern revival'],0,"C is about the high-wheeler: fast, but riders fell over the handlebars."),
MC("Choose the heading for paragraph D.",['i. A dangerous kind of speed','ii. A machine without pedals','iii. Cycling and social change','iv. Pedals arrive, but comfort does not','v. The design that lasted','vi. A modern revival'],4,"D presents the safety bicycle, whose basic shape has changed little."),
MC("Choose the heading for paragraph E.",['i. A dangerous kind of speed','ii. A machine without pedals','iii. Cycling and social change','iv. Pedals arrive, but comfort does not','v. The design that lasted','vi. A modern revival'],2,"E covers the social and industrial effects of the bicycle.")
]},

{id:'r2',title:'Sleep and the resting brain',min:20,
paras:[
['A',"For much of history, sleep was regarded as a passive state in which the body and mind simply switched off. Since the middle of the twentieth century, recordings of electrical activity in the brain have shown that this is wrong. During a night the brain passes through repeating cycles, each lasting roughly ninety minutes, that include light sleep, deep 'slow-wave' sleep and the stage known as REM, when most vivid dreaming takes place. Far from being idle, the sleeping brain is busy with tasks that the waking brain cannot easily carry out."],
['B',"One of those tasks seems to be memory consolidation, the process by which new information is stabilised and stored. In many experiments, volunteers who learned a list of facts and then slept recalled more the next day than volunteers who stayed awake for the same period. Researchers suspect that deep sleep plays a particular role in retaining facts and events, while REM sleep may matter more for practised skills and emotional memories, although the division is not clear-cut."],
['C',"Part of the evidence comes from animals. In the 1990s, scientists recording from individual neurons in rats noticed that cells which had fired in a particular order while a rat ran through a maze fired again in the same order while the animal slept. This 'replay' suggested that the brain rehearses the day's experience offline. Similar patterns have since been reported in other species, including humans, though the methods used to observe them are necessarily less direct."],
['D',"These findings matter for students. Staying awake all night to study may feel like dedication, but sleep deprivation reduces attention and makes it harder to take in new material, so the extra hours are often poorly spent. The problem is sharpest for teenagers, whose body clocks tend to shift later during adolescence. Some schools have responded by starting lessons later in the morning, and a number have reported better attendance and alertness, although the evidence on examination results is mixed."],
['E',"Scientists nevertheless urge caution. Sleep is not a magic study tool, and many questions remain open, for example how much sleep each person needs and whether short daytime naps can substitute for a full night. What the research does support is a modest conclusion: learning and rest work together, and treating sleep as wasted time is a mistake."]
],
qs:[
TF("Early scientists believed that the brain was largely inactive during sleep.",'T',"Paragraph A: sleep was regarded as a passive state."),
TF("A typical sleep cycle lasts about ninety minutes.",'T',"Paragraph A: 'each lasting roughly ninety minutes'."),
TF("Memory replay has been observed only in rats.",'F',"Paragraph C: similar patterns have been reported in other species, including humans."),
TF("Later school start times have clearly improved exam results in every school that tried them.",'F',"Paragraph D: the evidence on examination results is mixed."),
MC("What is the main point of paragraph B?",['Sleep helps the brain to store new information','Volunteers prefer to learn in the evening','Skills are easier to learn than facts','REM sleep is more important than deep sleep'],0,"B explains memory consolidation: those who slept recalled more."),
MC("Why does the writer mention rats in paragraph C?",['To show that animals need more sleep than humans','To provide evidence that the brain rehearses experience during sleep','To explain how dreams begin','To compare the memory of different species'],1,"Neurons fired in the same order during sleep: replay."),
MC("According to paragraph D, teenagers are especially affected because",['they sleep less than adults','they do more homework','their body clocks shift later','their schools start too early in every country'],2,"'body clocks tend to shift later'."),
MC("The writer's attitude in paragraph E is",['dismissive of current research','cautious but positive','certain that naps replace sleep','uninterested in practical uses'],1,"'Scientists urge caution' and a 'modest conclusion'."),
FL("Deep sleep seems to help people retain ____ and events (one word).",'facts',['fact'],"Paragraph B."),
FL("In the maze study, neurons fired again in the same ____ during sleep (one word).",'order',['sequence'],"Paragraph C: 'fired again in the same order'.")
]},

{id:'r3',title:'Cities that run hot',min:20,
paras:[
['A',"Anyone who has walked from a park into a busy shopping street on a summer evening has felt it: the city is warmer. Climate scientists call the effect the urban heat island, and define it as a built-up area that is noticeably warmer than the countryside around it, particularly at night. The difference is often a few degrees Celsius, although it varies with the size of the city, its layout and the weather."],
['B',"Several features of cities combine to produce the effect. Dark surfaces such as asphalt and roofing absorb sunlight during the day and release the heat slowly after sunset. Plants cool the air by releasing water vapour, but in a city many of them have been replaced by buildings and pavements. Tall buildings can block breezes that would otherwise carry heat away, and vehicles, factories and air-conditioning units all add heat of their own."],
['C',"The consequences are more than a matter of comfort. Hot nights increase demand for air-conditioning, which raises electricity use and, in turn, adds more waste heat to the street. People who cannot escape the heat, especially the elderly, face a higher risk of illness during heatwaves. Higher temperatures also speed up the chemical reactions that produce ground-level ozone, so air pollution may worsen at the same time."],
['D',"Cities have a range of remedies. Planting trees and creating parks supplies shade and moisture. Roofs can be covered with vegetation, or painted in light colours that reflect sunlight, and pale paving materials absorb less heat than dark ones. Some planners go further: a German city such as Stuttgart has long reserved open corridors through which cooler air from surrounding hills can flow into the centre."],
['E',"None of these measures is free of drawbacks. Trees need water, which may be scarce in dry summers, and a reflective roof that helps in July may slightly increase heating needs in winter. For this reason, researchers generally recommend a combination of measures adapted to local conditions, especially in dense, high-rise cities, where there is little room for new parks."]
],
qs:[
MC("Which paragraph contains a definition of the central term?",['A','B','C','D','E'],0,"A defines the urban heat island."),
MC("Which paragraph explains why plants lower temperatures?",['A','B','C','D','E'],1,"B: plants release water vapour."),
MC("Which paragraph describes how a health risk arises?",['A','B','C','D','E'],2,"C: hot nights and the elderly."),
MC("Which paragraph mentions a city that plans routes for air flow?",['A','B','C','D','E'],3,"D: Stuttgart's open corridors."),
MC("Which paragraph warns that a remedy may have a disadvantage?",['A','B','C','D','E'],4,"E: trees need water; reflective roofs and winter heating."),
FL("Dark materials in roads and roofs ____ sunlight during the day (one word).",'absorb',['absorbs','trap'],"Paragraph B."),
FL("Plants cool the air by releasing ____ (two words).",'water vapour',['water vapor','moisture'],"Paragraph B."),
FL("Tall buildings can block ____ that would carry heat away (one word).",'breezes',['breeze','winds','wind'],"Paragraph B."),
FL("Waste heat comes from vehicles, factories and ____ units (two words).",'air-conditioning',['air conditioning','air conditioner','air-conditioner'],"Paragraph B."),
TF("The temperature gap between a city and its surroundings is always larger in summer than in winter.",'NG',"The text gives no comparison between seasons."),
TF("A reflective roof may increase heating needs in the cold season.",'T',"Paragraph E: 'slightly increase heating needs in winter'.")
]}
);
IELTS.listen.push(
{id:'l1',title:'Booking a hostel room',sec:'Section 1 style',accent:'en-GB',
lines:[
['A',"Good morning, Harbour View Hostel, how can I help you?"],
['B',"Hello, I'd like to book a room for next month, please."],
['A',"Certainly. Could I have your surname?"],
['B',"It's Okonkwo. That's O, K, O, N, K, W, O."],
['A',"Thank you, Mr Okonkwo. And which dates would you like?"],
['B',"I'm arriving on the fourteenth of March and I'd like to stay for three nights."],
['A',"That's fine. We have a four-bed dormitory or a private double room. The dormitory is twenty-eight pounds a night per person and the double is sixty-five pounds a night."],
['B',"I'll take the dormitory, please. Is breakfast included?"],
['A',"Breakfast is not included, but there is a kitchen you can use for free. Towels are provided, though."],
['B',"That's perfect. Where exactly is the hostel? I'll arrive by train."],
['A',"We're a ten-minute walk from Waverley Station. Turn left at the main exit and follow the signs for the castle."],
['B',"Great. Do you need a phone number?"],
['A',"Yes please, in case we need to contact you."],
['B',"It's zero seven seven zero zero, nine zero zero, four six one."],
['A',"Let me read that back: 07700 900 461. Thank you. You'll receive an email confirmation shortly."]
],
qs:[
FL("Surname: ____",'Okonkwo',[],"Spelled out: O-K-O-N-K-W-O."),
FL("Arrival date: ____ March",'14',['14th','fourteenth','fourteen'],"'the fourteenth of March'."),
FL("Number of nights: ____",'3',['three'],"'three nights'."),
MC("Room type chosen:",['Private double room','Four-bed dormitory','Six-bed dormitory'],1,"He chooses the dormitory (four-bed)."),
FL("Price per night (in pounds): ____",'28',['£28','twenty-eight','twenty eight'],"The dormitory costs twenty-eight pounds."),
MC("Which is included in the price?",['Breakfast','Towels','Parking'],1,"Breakfast is not included; towels are provided."),
FL("Nearest station: ____",'Waverley',['Waverley Station'],"Ten minutes' walk from Waverley Station."),
FL("Phone number: ____",'07700 900 461',['07700900461','07700 900461'],"Read back: 07700 900 461.")
]},

{id:'l2',title:'Orientation at the university library',sec:'Section 2 style',accent:'en-GB',
lines:[
['A',"Welcome to the library. I'm going to spend a few minutes explaining how it works, so please listen carefully, because there are some changes from last year."],
['A',"The main entrance is on the ground floor. To get in you need your student card, and you must show it every time, even if you are carrying only a laptop. The library is open from eight in the morning to ten at night from Monday to Friday. On Saturdays it closes earlier, at five o'clock, and on Sundays it is open only from noon until six."],
['A',"The ground floor holds the help desk, the computers and the group study rooms. These rooms can be booked online for up to two hours at a time, but you cannot book more than one room per day. The first floor has the main book collection, and the second floor is reserved for journals and newspapers."],
['A',"If you want complete silence, go to the third floor. Mobile phones must be switched off there, and eating is not allowed. On the other floors you may speak quietly and bring in drinks with a lid, but not hot food."],
['A',"You may borrow up to twelve books at once. Normal loans last for three weeks, and you can renew a book twice online unless somebody else has reserved it. If a book is returned late, there is a fine of twenty pence per day. Please do not ignore these fines: students with unpaid fines of more than five pounds cannot borrow any more books."],
['A',"Finally, if you cannot find a book, ask at the help desk. The staff can order it from another university, which usually takes about one week, and the service is free for undergraduates. That's everything for now. Are there any questions?"]
],
qs:[
MC("To enter the library, students must",['sign a register','show a student card','leave their bags outside'],1,"'you need your student card, and you must show it every time'."),
FL("On Saturdays the library closes at ____ (a time)",'5',['five','5 pm','5pm','5 o\'clock','17:00','five o\'clock','5.00','5:00'],"Saturday closing time: five o'clock."),
MC("Group study rooms can be booked for",['one hour','up to two hours','a whole afternoon'],1,"'up to two hours at a time'."),
MC("Which floor is reserved for journals and newspapers?",['The first floor','The second floor','The third floor'],1,"The first floor has books; the second has journals and newspapers."),
MC("On the third floor",['hot food is allowed','phones must be switched off','group work is encouraged'],1,"Complete silence, phones off, no eating."),
FL("Students can borrow up to ____ books at once (a number)",'12',['twelve'],"'up to twelve books'."),
FL("The fine for a late book is ____ pence per day (a number)",'20',['twenty'],"'twenty pence per day'."),
FL("A book ordered from another university takes about ____ (one week / 1 week)",'one week',['1 week','a week','week','7 days','seven days'],"'about one week'.")
]},

{id:'l3',title:'Lecture: how honeybees give directions',sec:'Section 4 style',accent:'en-US',
lines:[
['A',"Today I'd like to talk about one of the most remarkable examples of animal communication: the dance of the honeybee. The Austrian scientist Karl von Frisch spent decades studying it, and in 1973 he shared a Nobel Prize for this work."],
['A',"When a forager bee finds a good source of nectar, she returns to the hive and performs what is called a waggle dance on the vertical surface of the honeycomb. She moves in a figure of eight, and in the straight middle section she waggles her body from side to side."],
['A',"The key point is that this dance carries information. The direction of the straight run, measured against the vertical, shows the direction of the food relative to the sun. If the bee dances straight up the comb, the food lies in the direction of the sun. If the run points thirty degrees to the right of vertical, the food lies thirty degrees to the right of the sun."],
['A',"The length of the waggle run tells the other bees how far to fly. A longer waggle means more distance. Roughly speaking, each second of waggling corresponds to about one kilometre, although this varies between populations of bees."],
['A',"Remarkably, the bees adjust for the movement of the sun during the day. Even when a bee has been waiting in the dark hive for an hour, her dance corrects the angle. Von Frisch's critics initially doubted that insects could do this, and for years some researchers believed the bees were simply following the smell of the flowers on the dancer's body."],
['A',"This was settled much later, when researchers built a small robotic bee that performed the dance without any scent. Real bees, watching in the dark, flew to the location indicated by the robot. The experiment showed that the dance itself carries the message."]
],
qs:[
FL("The scientist who studied the dance was Karl von ____ (one word)",'Frisch',[],"Karl von Frisch."),
FL("He shared a Nobel Prize in ____ (a year)",'1973',[],"'in 1973 he shared a Nobel Prize'."),
FL("The dance takes place on the ____ surface of the honeycomb (one word)",'vertical',[],"'vertical surface of the honeycomb'."),
FL("The direction of the straight run is measured relative to the ____ (one word)",'sun',[],"The food's direction relative to the sun."),
FL("The length of the waggle run shows the ____ to the food (one word)",'distance',[],"'how far to fly'."),
FL("Each second of waggling corresponds to roughly one ____ (one word)",'kilometre',['kilometer','km'],"'about one kilometre'."),
MC("Some researchers once believed the bees were following",['the wind direction','the smell of flowers','the sound of the dance'],1,"They thought the dancer's scent guided the others."),
MC("What did the robotic bee experiment show?",['Bees cannot learn new dances','The dance itself carries the message','Robots can be taught to forage'],1,"The robot had no scent, yet the bees flew to the indicated place.")
]}
);
