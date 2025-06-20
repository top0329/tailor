import { useArticleService } from "@/app/_services";

const Article = () => {
  const { article } = useArticleService();

  return (
    <div className="basis-2/3 p-[32px]">
      <div className="relative flex flex-col gap-[32px] h-[84vh] overflow-y-scroll scrollbar ">
        <div className="bg-second h-[40px] flex justify-between items-center px-[16px] rounded-[8px]">
          <div className="flex gap-[8px] items-center text-third-foreground">
            <p>Article Level:</p>
            <p className="font-bold">Intermediate</p>
            <p>(1200 - 1400)</p>
          </div>
          <div>
            <button className="text-third-foreground text-[24px]">Aa</button>
          </div>
        </div>
        <p className="text-h3 text-second-foreground font-bold">
          The Future of Learning: Integrating AI and Human-Centric Education
        </p>
        <div>
          {(article?.content || "").split("\n").map((line, index) => {
            if (line.trim() === "") {
              return <br key={index} />;
            }
            return <p key={index}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Article;
