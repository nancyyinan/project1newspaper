document.addEventListener("DOMContentLoaded", () => {
  const newsBlocks = document.querySelectorAll(".news-block");
  const overlay = document.getElementById("overlay");
  const promptModal = document.getElementById("prompt-modal");
  const contentModal = document.getElementById("content-modal");
  const allReadButton = document.getElementById("all-read-button");

  // 弹窗里的按钮
  const cancelBtn = document.getElementById("cancel-btn");
  const continueBtn = document.getElementById("continue-btn");
  const finishBtn = document.getElementById("finish-btn");
  const articleContent = document.getElementById("article-content");
  let currentBlock = null; // 当前正在阅读的新闻块

  const skipBtn = document.getElementById("skip-btn");
  const allReadBtn = document.getElementById("all-read-button");

  // 模拟存放12篇的原文内容
  // 实际可用Ajax或后端模板来加载
  const articleData = {
    1: "Last month, I decided to try an experiment with my media diet. Usually, in the morning, I skim e-mail newsletters in my in-box, scroll through my Twitter feed, and peruse the news apps on my phone; later, in the office, I tap through my notifications and monitor more than a dozen news-related apps, including Facebook and Twitter, while juggling other tasks. I usually feel as though I’m managing to stay abreast of the day’s biggest news stories, but my reading tends to be fragmentary—I’m only skimming a story or absorbing a partial update. I haven’t stopped getting my news in this way, but I’m trying to change my ways to a certain extent.",
    2: "I’ve adopted a new ritual: reading the print edition of the New York Times over breakfast and on my commute. Since the early two-thousands, when I was a cub reporter at the Times, I’ve had the newspaper delivered daily to my door, but, as I’ve started getting more and more of my news online, I’ve been neglecting it. Having returned to spending uninterrupted time with the print newspaper each morning, I’m engaging with the news in a more focussed way. Certainly, I’m able to read more broadly. I’ve read articles that weren’t in my social-media feeds, or that I missed while scrolling through my apps: reporting on efforts to make Copenhagen a carbon-neutral city, on talks between the United States and the Taliban, on a new study that found that the size of bullets affects mortality rates in shootings.It seems to me that I’ve become better informed.",
    3: "Many people have tried such experiments, of course. And much has been made of how being tethered to our phones affects everything from our attention spans to our psychological well-being. In his new book, “Digital Minimalism: Choosing a Focused Life in a Noisy World,” Cal Newport, a computer-science professor at Georgetown University, marshals evidence that the addictive properties of our devices are not accidental but, rather, the product of careful thinking by tech companies about the feedback loops that will keep people returning to them. Newport’s main indictment is of social-media platforms, but he also argues that people need to rethink the way they consume news.Exposure to the online torrent of “incomplete, redundant, and often contradictory” information that now invariably follows a major news event is counterproductive and leaves us less informed, he writes. Even when nothing earth-shattering is happening on a given day, he continues, people follow a compulsive pattern of media consumption, triggered by any hint of boredom.",
    4: "“If you’re interested in politics, for example, and lean toward the left side of the political spectrum, this sequence might go from CNN.com, to the New York Times home page, to Politico, to the Atlantic, to your Twitter feed, and finally to your Facebook timeline,” he explains. Techies might add Hacker News and Reddit; sports fans, ESPN. Media companies profit from this “lucrative tic.” “Checking ten different sites ten times a day makes them money, even if it doesn’t leave you more informed than checking one good site once a day,” he concludes.",
    5: "In 2008, the Columbia Journalism Review published an article with the headline “Overload!,” which examined news fatigue in “an age of too much information.” When “Overload!” was published, BlackBerrys still dominated the smartphone market, push notifications hadn’t yet to come to the iPhone, retweets weren’t built into Twitter, and BuzzFeed News did not exist. Looking back, the idea of suffering from information overload in 2008 seems almost quaint. Now, more than a decade later, a fresh reckoning seems to be upon us. Last year, Tim Cook, the chief executive officer of Apple, unveiled a new iPhone feature, Screen Time, which allows users to track their phone activity. During an interview at a Fortune conference, Cook said that he was monitoring his own usage and had “slashed” the number of notifications he receives. “I think it has become clear to all of us that some of us are spending too much time on our devices,” Cook said.",
    6: "It is worth considering how news organizations have contributed to the problems Newport and Cook describe. Media outlets have been reduced to fighting over a shrinking share of our attention online; as Facebook, Google, and other tech platforms have come to monopolize our digital lives, news organizations have had to assume a subsidiary role, relying on those sites for traffic. That dependence exerts a powerful influence on which stories are pursued, how they’re presented, and the speed and volume at which they’re turned out. In “World Without Mind: the Existential Threat of Big Tech,” published in 2017, Franklin Foer, the former editor-in-chief of The New Republic, writes about “a mad, shameless chase to gain clicks through Facebook” and “a relentless effort to game Google’s algorithms.” Newspapers and magazines have long sought to command large readerships, but these efforts used to be primarily the province of circulation departments; newsrooms were insulated from these pressures, with little sense of what readers actually read.    ",
    7: "Nowadays, at both legacy news organizations and those that were born online, audience metrics are everywhere. At the Times, everyone in the newsroom has access to an internal, custom-built analytics tool that shows how many people are reading each story, where those people are coming from, what devices they are using, how the stories are being promoted, and so on. Additional, commercially built audience tools, such as Chartbeat and Google Analytics, are also widely available. As the editor of newyorker.com, I keep a browser tab open to Parse.ly, an application that shows me, in real time, various readership numbers for the stories on our Web site. Even at news organizations committed to insuring that editorial values—and not commercial interests—determine coverage, it can be difficult for editors to decide how much attention should be paid to these metrics. In “Breaking News: the Remaking of Journalism and Why It Matters,” Alan Rusbridger, the former editor-in-chief of the Guardian, recounts the gradual introduction of metrics into his newspaper’s decision-making processes. The goal, he writes, is to have “a data- informed newsroom, not a data-led one.” But it’s hard to know when the former crosses over into being the latter.",
    8: "For digital-media organizations sustained by advertising, the temptations are almost irresistible. Each time a reader comes to a news site from a social-media or search platform, the visit, no matter how brief, brings in some amount of revenue. Foer calls this phenomenon “drive-by traffic.” As Facebook and Google have grown, they have pushed down advertising prices, and revenue-per-click from drive-by traffic has shrunk; even so, it continues to provide an incentive for any number of depressing modern media trends, including clickbait headlines, the proliferation of hastily written “hot takes,” and increasingly homogeneous coverage as everyone chases the same trending news stories, so as not to miss out on the traffic they will bring. Any content that is cheap to produce and has the potential to generate clicks on Facebook or Google is now a revenue-generating “audience opportunity.”    ",
    9: "In theory, a subscription-based model should be a dramatic improvement, substituting for the relentless pursuit of page views the superior goal of producing journalism that can’t be found anywhere else and is worth paying for. Foer asserts that subscription-based reader revenue is the only viable path for a media outlet seeking to maintain its editorial identity. There is a reassuring freedom in his imagined business model: instead of chasing legions of visitors who land on your site from a Google search on some trending topic and never return, a publication might focus on its true fans. “Media need to scale back their ambitions, to return to their niches, to reclaim the loyalty of core audiences,” Foer writes. “To rescue themselves, media will need to charge readers, and readers will need to pay.”    ",
    10: "But the most common approach to subscription growth relies, to a fair extent, on many of the same tactics that ad-driven media businesses employ. Most news organizations pursuing consumer revenue have adopted a metered-paywall strategy, which gives readers access to a certain number of free articles per month before requiring a subscription for access. This allows non-subscribers to get to know the publication, sampling a piece here and there, perhaps in the course of a few months or longer, before deciding to pay. And yet Facebook and Google remain essential gateways for getting readers into this so-called subscription funnel and pulling them through it. The tyranny of the trending story still holds. The work of transforming casual visitors into regular readers, moreover, creates its own set of incentives. The onslaught of news-related push notifications on our phones is due, in part, to the need to draw readers back, again and again. And enticing readers to subscribe requires the constant creation of new and varied material. It’s not enough for readers to immerse themselves in an article or two per month; they must develop loyalty to a site, returning repeatedly until they hit the paywall. Quality is paramount—but it must also be produced at scale.",
    11: "Lately, I have begun to wonder, like Newport, whether the sheer volume of online news actually runs counter to the goal of keeping people informed. Research on this question is surprisingly scant. “My hunch is that readers aren’t less informed than before,” Pablo Boczkowski, a professor of communication studies at Northwestern University, told me.“They’re differently informed.” Among Boczkowski’s areas of research is how young people interact with the news today. Most do not go online seeking the news; instead, they encounter it incidentally, on social media. They might get on their phones or computers to check for updates or messages from their friends, and, along the way, encounter a post from a news site. Few people sit down in the morning to read the print newspaper or make a point of watching the TV news in the evening. Instead, they are constantly “being touched, rubbed by the news,” Bockzkowski said. “It’s part of the environment.” How well can news be absorbed by osmosis? Studies have found that people bounce between tasks on their computers at stunning rates; a paper published last year found a median switch time of eleven seconds. Introduce mobile devices into the mix, and the switching is even faster. It’s no wonder that news is getting chopped up into smaller bits. “If you’re an average site, you have five to seven seconds to tell your story,” Boczkowski told me. It seems reasonable to guess, therefore, that people are now more aware, on a general level, of different topics in the news, but that they also have less depth of understanding in any one area. Even those readers who are inclined to engage deeply and broadly with the news are constrained by social-media filter bubbles, within which agreeable content, posted by people in their networks, is prioritized.    ",
    12: "In theory, the social-media age could make us better monitorial citizens. But Schudson’s model, which assumes that monitorial citizens will be activated at appropriate moments, didn’t anticipate the ease with which Facebook, Twitter, and other platforms can set off panics at the pool. The danger today—as phenomena such as Brexit and anti-vaccine activism demonstrate—is one of false alarms. In 2017, the cognitive scientists Steven Sloman and Philip Fernbach published the book “The Knowledge Illusion: Why We Never Think Alone.” Their book, which is about the perils of superficial knowledge, offers as good an explanation as any of how our social-media-based news ecosystem is leading to undesirable outcomes in our democracy. People vastly overestimate what they know, and their unjustifiably strong opinions are reinforced by other people who are similarly ill-informed, creating self-reinforcing communities of misinformation: When group members don't know much but share a position, members of the group can reinforce one another's sense of understanding, leading everyone to feel like their position is justified and their mission is clear, even when there is no real expertise to give it solid support. Everyone sees everyone else as justifying their view so that opinion rests on a mirage. That same year, my colleague Elizabeth Kolbert cited Sloman and Fernbach’s work in a piece called “Why Facts Don’t Change Our Minds.” “If your position on, say, the Affordable Care Act is baseless and I rely on it, then my opinion is also baseless,” she explains. “When I talk to Tom and he decides he agrees with me, his opinion is also baseless, but now that the three of us concur we feel that much more smug about our views. If we all now dismiss as unconvincing any information that contradicts our opinion, you get, well, the Trump Administration.” As it turns out, there is a way to puncture this illusion of knowledge. It involves forcing people to explain in detail what would happen if their views on a specific public-policy issue were put into practice. It’s when we try to provide a “causal explanation,” Sloman and Ferbach write, that we realize how ignorant we are. That realization, in turn, leads us to become less extreme in our views. This insight has an obvious implication for media: depth matters. Journalism that engages with complexity, examines the implications of proposed policies, and offers the public rigorous analysis can lead to a more informed—and less polarized—citizenry. And yet, if Schudson is right, then only a small portion of readers will have the time, inclination, and disposition to become so ideally informed. Far more people will be monitorial, rather than informed, citizens—and, thanks to social media and high-volume news operations, they will be easily alarmed and distracted. Adding yet more stories to this maelstrom may make a certain economic sense for media organizations, but it won’t necessarily make us any better informed. It might only further fragment our knowledge. Perhaps we need to recalibrate our relationship with media—to rethink how we ought to consume information more generally and what it means to be informed.",
  };

  // 点击每个新闻块时
  newsBlocks.forEach((block) => {
    block.addEventListener("click", () => {
      currentBlock = block; // 记录当前的区块DOM
      // 显示prompt
      showPromptModal();
    });
  });

  function showPromptModal() {
    overlay.classList.remove("hidden");
    promptModal.classList.remove("hidden");
  }

  function hidePromptModal() {
    overlay.classList.add("hidden");
    promptModal.classList.add("hidden");
  }

  function showContentModal() {
    overlay.classList.remove("hidden");
    contentModal.classList.remove("hidden");
  }

  function hideContentModal() {
    overlay.classList.add("hidden");
    contentModal.classList.add("hidden");
  }

  // “取消”阅读
  cancelBtn.addEventListener("click", () => {
    hidePromptModal();
  });

  // 点“继续阅读”
  continueBtn.addEventListener("click", () => {
    hidePromptModal(); // 先隐藏“是否继续”的窗
    showContentModal(); // 显示正文窗

    // 根据当前block的data-id加载正文
    if (currentBlock) {
      // 获取当前点击的 data-news-id
      const articleId = currentBlock.getAttribute("data-news-id");
      // 根据id去 articleData 对象里取出对应文本
      const text = articleData[articleId] || "No content available.";
      // 显示在弹窗区域
      articleContent.textContent = text;
    }
  });

  // “完成阅读”
  finishBtn.addEventListener("click", () => {
    hideContentModal();
    if (currentBlock) {
      currentBlock.remove(); // 从DOM中移除该卡片
      currentBlock = null;
    }
    checkAllRead();
  });

  // 遮罩点击(如果需要点击外面空白就能关闭)
  overlay.addEventListener("click", () => {
    // 若contentModal在显示，点击overlay可关闭
    if (!contentModal.classList.contains("hidden")) {
      hideContentModal();
    }
    // 若promptModal在显示，则关闭
    else if (!promptModal.classList.contains("hidden")) {
      hidePromptModal();
    }
  });

  // 检查是否全部阅读完
  function checkAllRead() {
    const remaining = document.querySelectorAll(".news-block");
    if (remaining.length === 0) {
      // 显示“What's more?”按钮，引导到 final.html
      allReadButton.classList.remove("hidden");

      // 可选：把问号改为感叹号
      document.getElementById("punctuationMark").textContent = "!";
    }
    const skipBtn = document.getElementById("skip-btn");
    if (skipBtn) {
      skipBtn.style.backgroundColor = "#fff"; // 白色背景
      skipBtn.style.color = "#fff"; // 白色文字
      skipBtn.style.cursor = "default"; // 鼠标变默认
      skipBtn.style.pointerEvents = "none"; // 禁止点击
      skipBtn.style.border = "none"; // 去掉边框,以防有黑边
    }
  }

  skipBtn.addEventListener("click", () => {
    // 点击时移除所有新闻块
    const blocks = document.querySelectorAll(".news-block");
    blocks.forEach((block) => block.remove());

    // 显示 "What's more?" 按钮
    allReadBtn.classList.remove("hidden");

    // 改成全白色 + 无鼠标交互
    skipBtn.style.backgroundColor = "#fff";
    skipBtn.style.color = "#fff";
    skipBtn.style.border = "none";
    skipBtn.style.cursor = "default";
    skipBtn.style.pointerEvents = "none";
    // pointerEvents为none后，鼠标移上去没有任何效果，也不能再点击

    // 可选：也可以调节宽高或padding来让它真正“缩”到看不见
    // skipBtn.style.width = "0px";
    // skipBtn.style.padding = "0";
  });


});
