import { Badge } from "../ui/badge"

interface Article {
  title: string
  date: string
  category: "Business" | "Student"
  clicks: number
  slug: string
}

const articles: Article[] = [
  {
    title: "Why Traditional Marketing Fails with Gen Z",
    date: "16 Nov 2021",
    category: "Business",
    clicks: 136,
    slug: "traditional-marketing-gen-z",
  },
  {
    title: "Campus Marketing: A $X Billion Dollar Opportunity",
    date: "27 Nov 2021",
    category: "Student",
    clicks: 108,
    slug: "campus-marketing-opportunity",
  },
  {
    title: "The ROI of Campus Marketing vs. Digital Advertising",
    date: "29 Nov 2021",
    category: "Business",
    clicks: 48,
    slug: "campus-marketing-roi",
  },
]

export default function BlogList() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-[52px_2fr_0.5fr_auto_1fr] gap-4 items-center text-sm text-[#5C6E9A] font-medium text-muted-foreground mb-2">
        <div />
        <div>Article Title</div>
        <div>Post Date</div>
        <div>Category</div>
        <div>Clicks</div>
      </div>
      <div className="space-y-2">
        {articles.map((article) => (
          <div
            key={article.slug}
            className="grid grid-cols-[52px_2fr_0.5fr_auto_1fr] gap-4 items-center p-2 rounded-lg hover:bg-muted/50"
          >
            <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden flex gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qMzy548AKFurcXFXxoYdv8AXLMY6fJ.png"
                alt=""
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <h3 className="font-medium text-primary text-[#5C6E9A] line-clamp-2">{article.title}</h3>
            <span className="text-sm text-muted-foreground text-[#9CA7C4]">{article.date}</span>
            <Badge
              variant="secondary"
              className={
                article.category === "Business"
                  ? "bg-yellow-50 hover:bg-yellow-100 text-yellow-500 whitespace-nowrap"
                  : "bg-cyan-50 hover:bg-cyan-100 text-cyan-800 whitespace-nowrap"
              }
            >
              {article.category}
            </Badge>
            <span className="text-sm text-muted-foreground text-[#9CA7C4]">{article.clicks} Clicks</span>
          </div>
        ))}
      </div>
    </div>
  )
}

