/* ================= BUS2202 · Organisational Behaviour: name the concept in each scenario ================= */
{
 const S=(id,sec,title,stem,opts,items,min)=>({id,t:'cls',min:min||3,sec,title,stem:[stem],cols:[{h:'Concept',opts}],items:items.map(([t,a,why])=>({t,a:[a],why}))});
 const NA=['Not a perception effect'];
 BUILD['BUS2202:1']=[
  S('ob1-a','Active drills','Which anchor of OB knowledge?','Name the anchor of OB knowledge each situation illustrates.',['Systematic research','Practical orientation','Multidisciplinary','Contingency','Multiple levels of analysis'],[
   ['A manager tests a new bonus scheme in one branch and measures the results before rolling it out.','Systematic research','Evidence-based management.'],
   ['OB borrows concepts from psychology, sociology and economics.','Multidisciplinary'],
   ['A motivation practice that works in one country fails in another, so the situation has to be diagnosed before acting.','Contingency'],
   ['A theory is judged by whether managers can use it to improve how people get things done.','Practical orientation'],
   ['Conflict is studied between individuals, inside teams and between departments.','Multiple levels of analysis']]),
  S('ob1-b','Active drills','Name the term','Which key term does each definition describe?',['Human capital','Stakeholders','Corporate social responsibility','Open system','Triple bottom line'],[
   ['An organisation that takes in inputs from its environment and transforms them into outputs.','Open system'],
   ['The knowledge, skills, abilities and creative thinking that employees bring to an organisation.','Human capital'],
   ['Any entity that affects or is affected by the firm’s objectives and actions.','Stakeholders'],
   ['Activities that benefit society or the environment beyond the firm’s financial or legal obligations.','Corporate social responsibility'],
   ['Economic, social and environmental performance measured together.','Triple bottom line']])];
 BUILD['BUS2202:2']=[
  S('ob2-a','Active drills','Which Big Five trait?','Which Big Five factor does each description fit best?',['Openness to experience','Conscientiousness','Extraversion','Agreeableness','Neuroticism (low emotional stability)'],[
   ['Careful, disciplined and organized; the best overall predictor of job performance across jobs.','Conscientiousness'],
   ['Imaginative and curious; may predict creative performance.','Openness to experience'],
   ['Outgoing, talkative and assertive; associated with effective leaders and salespeople.','Extraversion'],
   ['Trusting and cooperative; predicts team-member and customer-service performance.','Agreeableness'],
   ['Anxious and insecure; lower stress tolerance.','Neuroticism (low emotional stability)']]),
  S('ob2-b','Active drills','Dark Triad','Which dark trait does each description fit?',['Machiavellianism','Narcissism','Psychopathy'],[
   ['Believes deceit is a natural tool and enjoys outwitting others to get what he wants.','Machiavellianism'],
   ['An obsessive belief in one’s own superiority, with a need for admiration and envy of others.','Narcissism'],
   ['Superficial charm hiding ruthless, impulsive and antisocial behaviour.','Psychopathy']]),
  S('ob2-c','Active drills','MARS model: what is missing?','The MARS model says individual performance depends on Motivation, Ability, Role perceptions and Situational factors. Which one is missing?',['Motivation','Ability','Role perceptions','Situational factors'],[
   ['A skilled and willing employee cannot finish because the software she needs is not available.','Situational factors'],
   ['An employee is keen and well trained but does not know which tasks have priority.','Role perceptions'],
   ['An employee knows the priorities and has the tools, but does not care about the work.','Motivation'],
   ['An employee is keen, knows what to do and has the tools, but lacks the skill to do the work.','Ability']])];
 BUILD['BUS2202:3']=[
  S('ob3-a','Active drills','Self-concept and self-evaluation','Which concept does each statement describe?',['Self-concept complexity','Self-concept consistency','Self-concept clarity','Self-enhancement','Self-verification','Self-esteem','Self-efficacy','Locus of control'],[
   ['She sees herself as a manager, a parent, an athlete and a volunteer, and each identity is quite distinct.','Self-concept complexity'],
   ['His view of himself as “creative” is confident and stable over time.','Self-concept clarity'],
   ['She dismisses feedback that contradicts how she sees herself and seeks feedback that confirms it.','Self-verification'],
   ['He presents himself as competent and ethical, and is slow to recognize his own mistakes.','Self-enhancement'],
   ['She believes she can successfully complete this specific presentation.','Self-efficacy'],
   ['He believes outcomes in his life are mainly in his own hands.','Locus of control'],
   ['She likes, respects and is satisfied with herself in general.','Self-esteem'],
   ['His roles at work, as a friend and as a parent are compatible with each other and with his abilities.','Self-concept consistency']],5),
  S('ob3-b','Active drills','Perceptual biases','Which perceptual effect or bias does each situation show?',['Stereotyping','Halo effect','False-consensus effect','Primacy effect','Recency effect','Self-serving bias','Fundamental attribution error','Self-fulfilling prophecy','Confirmation bias'],[
   ['A manager assumes all older employees are bad with technology.','Stereotyping'],
   ['Because an applicant is very punctual, the interviewer also rates her as highly creative.','Halo effect'],
   ['An employee assumes that everyone else shares his opinion of the new policy.','False-consensus effect'],
   ['A supervisor forms a lasting opinion of a new hire from the first meeting.','Primacy effect'],
   ['Last week’s mistake dominates an otherwise good annual review.','Recency effect'],
   ['A sales rep blames the economy for missing the target but credits her own skill for exceeding it.','Self-serving bias'],
   ['A manager blames a late colleague’s character, ignoring the train strike that caused the delay.','Fundamental attribution error'],
   ['A supervisor expects a new employee to be weak, treats her that way, and her performance declines.','Self-fulfilling prophecy'],
   ['A manager only notices the information that fits what he already believes about an employee.','Confirmation bias']],5)];
 BUILD['BUS2202:4']=[
  S('ob4-a','Active drills','Emotional labor and EI','Which concept does each statement describe?',['Surface acting','Deep acting','Emotional labor','Recognizing others’ emotions','Managing own emotions'],[
   ['A flight attendant fakes a smile while feeling irritated.','Surface acting'],
   ['A call-centre agent reframes the situation so that her friendly tone feels genuine.','Deep acting'],
   ['Employees must display organisationally desired emotions during customer interactions.','Emotional labor'],
   ['A manager notices that a colleague is anxious before a meeting.','Recognizing others’ emotions'],
   ['An employee calms down before replying to an angry email.','Managing own emotions']]),
  S('ob4-b','Active drills','EVLN: responses to dissatisfaction','Which response to job dissatisfaction is it?',['Exit','Voice','Loyalty','Neglect'],[
   ['An employee asks for a transfer to another department.','Exit'],
   ['An employee proposes a constructive solution to the problem with her manager.','Voice'],
   ['An employee patiently waits for things to improve.','Loyalty'],
   ['An employee puts in less effort, with more lateness and errors.','Neglect']]),
  S('ob4-c','Active drills','Attitudes and emotions','Which statement is about an attitude, which about an emotion?',['Attitude','Emotion'],[
   ['A cluster of beliefs, feelings and behavioural intentions about a job.','Attitude'],
   ['A brief episode, often nonconscious, tied to a specific event.','Emotion'],
   ['More stable over time and based on conscious reasoning.','Attitude'],
   ['An employee feels sudden irritation when he opens an email from a client.','Emotion']])];
 BUILD['BUS2202:5']=[
  S('ob5-a','Active drills','Which motivation theory idea?','Which concept does each situation illustrate?',['Drive to acquire','Drive to bond','Drive to comprehend','Drive to defend','Need for achievement','Need for affiliation','Need for power'],[
   ['An employee wants the best bonus and a bigger office.','Drive to acquire'],
   ['An employee joins the company softball team to make friends.','Drive to bond'],
   ['An employee asks endless questions to understand how the system works.','Drive to comprehend'],
   ['An employee protects her projects and her reputation from criticism.','Drive to defend'],
   ['An employee prefers moderately risky, challenging goals and wants clear feedback.','Need for achievement'],
   ['An employee conforms to the group and avoids conflict to gain approval.','Need for affiliation'],
   ['An employee seeks influence over decisions for the organisation’s benefit.','Need for power']],5),
  S('ob5-b','Active drills','Expectancy theory: which link is broken?','Motivation = E-to-P × P-to-O × outcome valence. Which belief is weak?',['Effort-to-performance (E-to-P)','Performance-to-outcome (P-to-O)','Outcome valence'],[
   ['“No matter how hard I work, I cannot meet this target with the resources I have.”','Effort-to-performance (E-to-P)'],
   ['“My boss never measures what I do, so good work will not be rewarded.”','Performance-to-outcome (P-to-O)'],
   ['“I would get a trophy if I win, but I do not care about trophies.”','Outcome valence'],
   ['“I am confident I can do the job well, and I know the bonus will follow, but I do not want that bonus.”','Outcome valence']]),
  S('ob5-c','Active drills','OB Mod: type of consequence','Which type of consequence is it?',['Positive reinforcement','Negative reinforcement','Punishment','Extinction'],[
   ['A manager praises an employee after a punctual report; punctuality increases.','Positive reinforcement'],
   ['An annoying alert is switched off every time a report is on time; punctuality increases.','Negative reinforcement'],
   ['A manager gives a warning after a missed deadline; missed deadlines decrease.','Punishment'],
   ['A manager stops responding to complaints that used to be rewarded with attention; complaints fade.','Extinction']]),
  S('ob5-d','Active drills','Organizational justice','Which type of justice is at stake?',['Distributive justice','Procedural justice','Interactional justice'],[
   ['Pay raises are far lower in one team than another doing the same work.','Distributive justice'],
   ['Staff say the promotion decision process was secret and biased.','Procedural justice'],
   ['A manager announces a layoff in a rude, dismissive way.','Interactional justice']])];
 BUILD['BUS2202:6']=[
  S('ob6-a','Active drills','Tuckman’s stages of team development','At which stage is the team?',['Forming','Storming','Norming','Performing','Adjourning'],[
   ['Members are getting to know each other and checking whether they belong.','Forming'],
   ['Members compete for roles and influence; conflict surfaces.','Storming'],
   ['Roles become established and the team builds consensus on objectives.','Norming'],
   ['The team coordinates efficiently with high trust and commitment.','Performing'],
   ['The project is over and members wrap up and say goodbye.','Adjourning']]),
  S('ob6-b','Active drills','Task interdependence','Which type of task interdependence is it?',['Pooled interdependence','Sequential interdependence','Reciprocal interdependence'],[
   ['An assembly line where one worker’s output is the next worker’s input.','Sequential interdependence'],
   ['A medical team treating a patient, with work flowing back and forth.','Reciprocal interdependence'],
   ['Several clerks sharing one photocopier, each producing their own work.','Pooled interdependence']]),
  S('ob6-c','Active drills','Social loafing: more or less likely?','Do these conditions make social loafing more or less likely?',['More likely','Less likely'],[
   ['Individual performance is hidden within the team.','More likely'],
   ['Each member’s contribution is measured individually.','Less likely'],
   ['The team is very large.','More likely'],
   ['The work is intrinsically motivating and enriched.','Less likely']])];
 BUILD['BUS2202:7']=[
  S('ob7-a','Active drills','Path-goal leadership: which style?','Which path-goal style fits each situation best?',['Directive','Supportive','Participative','Achievement-oriented'],[
   ['Inexperienced employees face an ambiguous, nonroutine task.','Directive'],
   ['Skilled employees with an internal locus of control, who want to be challenged.','Achievement-oriented'],
   ['A team with low cohesion and employees who are stressed.','Supportive'],
   ['Employees with an internal locus of control working on a nonroutine task and wanting input.','Participative']]),
  S('ob7-b','Active drills','Perspectives on leadership','Which leadership perspective is it?',['Transformational leadership','Managerial leadership','Servant leadership','Implicit leadership','Authentic leadership','Leadership substitutes'],[
   ['A leader communicates an aspirational vision and walks the talk.','Transformational leadership'],
   ['A supervisor handles daily activities that support current objectives in a stable environment.','Managerial leadership'],
   ['A leader puts followers’ development first, is humble and nurturing.','Servant leadership'],
   ['A leader is judged more favourably when she fits our preconceived picture of a good leader.','Implicit leadership'],
   ['A leader reflects on her inner purpose, seeks feedback and is true to herself.','Authentic leadership'],
   ['A well-trained, experienced team makes task-oriented leadership unnecessary.','Leadership substitutes']],4)];
 BUILD['BUS2202:8']=[
  S('ob8-a','Active drills','Which source of power?','Name the source of power in each situation.',['Legitimate power','Reward power','Coercive power','Expert power','Referent power'],[
   ['A supervisor asks a clerk to file the reports because it is part of her position.','Legitimate power'],
   ['A manager can approve bonuses employees value.','Reward power'],
   ['A manager can suspend employees without pay.','Coercive power'],
   ['Colleagues follow the advice of the engineer who knows the system best.','Expert power'],
   ['Employees follow a leader they admire and identify with.','Referent power']]),
  S('ob8-b','Active drills','Contingencies of power and networks','Which concept is it?',['Nonsubstitutability','Centrality','Visibility','Discretion','Strong ties','Weak ties'],[
   ['Only one person in the firm can operate the legacy system, and there is no substitute.','Nonsubstitutability'],
   ['Many people depend quickly on a department’s output, so it sits at the hub of the workflow.','Centrality'],
   ['The expert is well known across the firm as the person who holds the valued knowledge.','Visibility'],
   ['Formal rules limit how much independent judgement a manager can use.','Discretion'],
   ['Close-knit friends share resources quickly, but the information is similar to what you already have.','Strong ties'],
   ['Acquaintances provide unique information, but more slowly.','Weak ties']],4)];
 BUILD['BUS2202:9']=[
  S('ob9-a','Active drills','Conflict-handling style','Which style is it?',['Problem solving','Forcing','Avoiding','Yielding','Compromising'],[
   ['Parties share information openly to find a solution that satisfies both interests.','Problem solving'],
   ['A manager imposes her position because a quick decision is needed.','Forcing'],
   ['A colleague withdraws from an emotionally charged argument.','Avoiding'],
   ['An employee gives in because the issue matters more to the other party.','Yielding'],
   ['Both parties give up some demands and meet in the middle.','Compromising']]),
  S('ob9-b','Active drills','Structural sources of conflict','Which structural source of conflict is it?',['Incompatible goals','Differentiation','Interdependence','Scarce resources','Ambiguous rules'],[
   ['Sales wants to maximise volume while operations wants to minimise costs.','Incompatible goals'],
   ['Younger and older employees have different values and experiences.','Differentiation'],
   ['Two departments compete for the same limited budget.','Scarce resources'],
   ['Nobody knows who has the authority to approve a purchase, which opens the door to office politics.','Ambiguous rules']]),
  S('ob9-c','Active drills','Task or relationship conflict?','What type of conflict is it?',['Task (constructive) conflict','Relationship conflict'],[
   ['Colleagues debate the logic and evidence of two proposals while respecting each other.','Task (constructive) conflict'],
   ['A team member attacks a colleague’s competence and character to win the argument.','Relationship conflict']])];
 BUILD['BUS2202:10']=[
  S('ob10-a','Active drills','Culture artifacts','Which artifact of organisational culture is it?',['Stories and legends','Language','Rituals','Ceremonies','Physical structures and symbols'],[
   ['Employees retell how the founder once personally refunded an unhappy customer.','Stories and legends'],
   ['Staff call customers “guests” and each other “partners”.','Language'],
   ['Every morning starts with a team huddle.','Rituals'],
   ['An annual awards evening honours the best employees.','Ceremonies'],
   ['An open-plan office with no private offices, even for the CEO.','Physical structures and symbols']]),
  S('ob10-b','Active drills','Dimensions of culture','Which content dimension of organisational culture is described?',['Innovation','Stability','Respect for people','Outcome orientation','Attention to detail'],[
   ['Experimenting, risk-taking, few rules.','Innovation'],
   ['Predictability, security, rule-oriented.','Stability'],
   ['Fairness and tolerance.','Respect for people'],
   ['Action-oriented, high expectations, results-oriented.','Outcome orientation'],
   ['Precise and analytic.','Attention to detail']])];
}
