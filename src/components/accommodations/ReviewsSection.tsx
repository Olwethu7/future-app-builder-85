import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Mock data - will be replaced with real data from Supabase
const reviews = [
  
  {
    id: 1,
    author: "Sarah Thompson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely amazing experience! The accommodation was beautiful, sustainable, and the cultural activities were enlightening. Highly recommend!",
  },
  {
    id: 2,
    author: "John Davis",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
    date: "1 month ago",
    comment:
      "Perfect eco-lodge! Staff were incredibly friendly and knowledgeable about the local area. The solar power and water conservation systems are impressive.",
  },
  {
    id: 3,
    author: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 4,
    date: "2 months ago",
    comment:
      "Great stay overall. Beautiful surroundings and very authentic Zulu cultural experiences. Only minor issue was WiFi connectivity, but that's expected in nature!",
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 75 },
  { stars: 4, percentage: 20 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
];

export const ReviewsSection = () => {
  const averageRating = 4.8;
  const totalReviews = 127;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-montserrat text-2xl font-bold mb-2">Guest Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="font-semibold text-lg">{averageRating}</span>
          </div>
          <span className="text-muted-foreground">({totalReviews} reviews)</span>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {ratingBreakdown.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm">{stars}</span>
                <Star className="w-3 h-3 fill-accent text-accent" />
              </div>
              <Progress value={percentage} className="flex-1" />
              <span className="text-sm text-muted-foreground w-12 text-right">
                {percentage}%
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Cleanliness</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold">4.9</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Communication</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold">4.8</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Value</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold">4.7</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Location</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold">4.9</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
