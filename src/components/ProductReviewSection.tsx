import React, { useState } from 'react';
import { ProductReview, UserProfile } from '../types';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Sparkles, 
  UserCheck, 
  Filter,
  ShieldCheck,
  Send
} from 'lucide-react';

interface ProductReviewSectionProps {
  productId: string;
  productName: string;
  reviews: ProductReview[];
  currentUser: UserProfile;
  onAddReview: (review: Omit<ProductReview, 'id' | 'createdAt'>) => void;
}

export const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({
  productId,
  productName,
  reviews,
  currentUser,
  onAddReview
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>('');
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Reviewer custom identity
  const [reviewerName, setReviewerName] = useState(currentUser.name || 'Dinesh Murugan');
  const [reviewerCity, setReviewerCity] = useState(currentUser.city || 'Chennai, TN');

  // Filter reviews for this specific product
  const productReviews = reviews.filter(r => r.productId === productId);

  // Calculate statistics
  const totalReviews = productReviews.length;
  const averageRating = totalReviews > 0 
    ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews)
    : 0;

  // Rating distribution (5 down to 1)
  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = productReviews.filter(r => r.rating === stars).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

  // Filtered reviews list
  const filteredReviews = starFilter !== null
    ? productReviews.filter(r => r.rating === starFilter)
    : productReviews;

  const ratingDescriptions: Record<number, string> = {
    1: '1 Star — Poor fit or construction',
    2: '2 Stars — Fair, had minor sizing issues',
    3: '3 Stars — Decent everyday wear',
    4: '4 Stars — Great heavyweight fabric & drape',
    5: '5 Stars — Elite Tiruppur craftsmanship!'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating === 0) {
      setErrorMsg('Please select a star rating between 1 and 5');
      return;
    }
    if (!commentText.trim() || commentText.trim().length < 5) {
      setErrorMsg('Please write at least 5 characters about the fit and fabric');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      onAddReview({
        productId,
        userId: currentUser.email || 'user-guest',
        userName: reviewerName.trim() || 'Verified Customer',
        userEmail: currentUser.email || 'customer@urbanstreet.in',
        userCity: reviewerCity.trim() || 'Tamil Nadu',
        rating: selectedRating,
        comment: commentText.trim(),
        verifiedPurchase: true,
        helpfulVotes: 0
      });

      setSelectedRating(0);
      setCommentText('');
      setIsSubmitting(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 400);
  };

  const handleToggleHelpful = (reviewId: string) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  return (
    <div className="pt-6 border-t border-[#E4E4E7] dark:border-[#22242F] space-y-6">
      
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-numbers text-[#2563EB] dark:text-[#3B82F6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider font-semibold">Customer Endorsements</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#09090B] dark:text-[#F8FAFC]">
            RATINGS & REVIEWS
          </h3>
        </div>
        <div className="text-right font-mono-numbers">
          <span className="text-xs text-[#71717A] dark:text-[#94A3B8]">
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'} verified
          </span>
        </div>
      </div>

      {/* Ratings Overview Matrix */}
      <div className="p-4 sm:p-5 bg-[#F4F4F5] dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Score Column */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#E4E4E7] dark:border-[#22242F] pb-4 md:pb-0 md:pr-4">
          <div className="font-display text-4xl sm:text-5xl font-black text-[#09090B] dark:text-[#F8FAFC] font-mono-numbers tracking-tight">
            {averageRating > 0 ? averageRating.toFixed(1) : '5.0'}
          </div>
          <div className="flex items-center gap-1 my-1.5 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= Math.round(averageRating || 5)
                    ? 'fill-current text-amber-500'
                    : 'text-slate-300 dark:text-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
            Based on {totalReviews} buyer rating{totalReviews === 1 ? '' : 's'}
          </span>
        </div>

        {/* Distribution Bars */}
        <div className="md:col-span-8 space-y-1.5">
          {distribution.map(({ stars, count, percentage }) => (
            <button
              key={stars}
              onClick={() => setStarFilter(starFilter === stars ? null : stars)}
              className={`w-full flex items-center gap-2.5 text-xs font-mono-numbers py-1 px-1.5 rounded transition-colors ${
                starFilter === stars
                  ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-[#71717A] dark:text-[#94A3B8]'
              }`}
            >
              <div className="flex items-center gap-1 w-10 shrink-0 font-medium">
                <span>{stars}</span>
                <Star className="w-3 h-3 fill-current text-amber-500" />
              </div>

              {/* Bar track */}
              <div className="flex-1 h-2 bg-[#E4E4E7] dark:bg-[#22242F] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="w-8 text-right font-medium">
                {count}
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Write a Review Submission Form */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl shadow-xs">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider font-bold text-[#09090B] dark:text-[#F8FAFC]">
                Leave a Verified Review
              </h4>
              <p className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                Share your fit, fabric feel, and drape experience with the community
              </p>
            </div>
          </div>

          {/* User Auth Stamp */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-md text-xs font-mono-numbers">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Logged in as {reviewerName.split(' ')[0]}</span>
          </div>
        </div>

        {showSuccessToast && (
          <div className="mb-4 p-3 bg-emerald-500/15 border border-emerald-500 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-mono-numbers flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Review submitted successfully! Thank you for supporting Tamil Nadu streetwear.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Rating Star Selection */}
          <div className="space-y-1">
            <label className="block text-xs font-mono-numbers font-medium text-[#09090B] dark:text-[#F8FAFC]">
              Your Overall Rating *
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || selectedRating) >= star;
                  return (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform focus:outline-hidden"
                      title={`${star} Star`}
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          isFilled 
                            ? 'fill-current text-amber-500' 
                            : 'text-slate-300 dark:text-slate-700'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>

              {(hoverRating || selectedRating) > 0 && (
                <span className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] ml-2">
                  {ratingDescriptions[hoverRating || selectedRating]}
                </span>
              )}
            </div>
          </div>

          {/* Reviewer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC] font-mono-numbers focus:border-[#2563EB] focus:outline-hidden"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mb-1">
                Location (City, State)
              </label>
              <input
                type="text"
                value={reviewerCity}
                onChange={(e) => setReviewerCity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC] font-mono-numbers focus:border-[#2563EB] focus:outline-hidden"
                placeholder="e.g. Chennai, TN"
                required
              />
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <label className="block text-xs font-mono-numbers font-medium text-[#09090B] dark:text-[#F8FAFC] mb-1">
              Your Written Review *
            </label>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="How does the fabric feel? Is the fit true to size? How does it look styled on the street?"
              className="w-full p-3 text-xs bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC] font-body focus:border-[#2563EB] focus:outline-hidden leading-relaxed"
            />
            <div className="flex items-center justify-between text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mt-1">
              <span>Verified customer reviews help improve future drops</span>
              <span>{commentText.length} characters</span>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 font-mono-numbers">
              {errorMsg}
            </p>
          )}

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Authentic buyer verification active</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono-numbers text-xs tracking-wider uppercase font-bold rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Posting Review...' : 'Submit Review'}</span>
            </button>
          </div>

        </form>

      </div>

      {/* Filter and Reviews Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] tracking-wide">
            CUSTOMER FEEDBACK ({filteredReviews.length})
          </span>
          {starFilter !== null && (
            <button
              onClick={() => setStarFilter(null)}
              className="text-xs font-mono-numbers text-[#2563EB] dark:text-[#3B82F6] hover:underline"
            >
              Clear filter ({starFilter}★)
            </button>
          )}
        </div>

        {/* Star filter chips */}
        <div className="flex items-center gap-1.5 text-xs font-mono-numbers">
          <span className="text-[#71717A] dark:text-[#94A3B8] text-[11px] flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter:
          </span>
          <button
            onClick={() => setStarFilter(null)}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              starFilter === null
                ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                : 'bg-[#F4F4F5] dark:bg-[#181A22] text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F8FAFC]'
            }`}
          >
            All
          </button>
          {[5, 4, 3].map(stars => (
            <button
              key={stars}
              onClick={() => setStarFilter(starFilter === stars ? null : stars)}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                starFilter === stars
                  ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                  : 'bg-[#F4F4F5] dark:bg-[#181A22] text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F8FAFC]'
              }`}
            >
              <span>{stars}</span>
              <Star className="w-2.5 h-2.5 fill-current text-amber-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Customer Reviews Feed */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center bg-[#F4F4F5] dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
            No reviews matching this rating filter yet. Be the first to share your experience with the {productName}!
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const hasVoted = helpfulVotes[rev.id];
            const currentCount = (rev.helpfulVotes || 0) + (hasVoted ? 1 : 0);

            return (
              <div
                key={rev.id}
                className="p-4 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-2.5 transition-all shadow-xs"
              >
                {/* Reviewer Header Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* User Avatar Circle */}
                    <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-display text-xs font-bold flex items-center justify-center shrink-0">
                      {rev.userName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] tracking-wide">
                          {rev.userName}
                        </span>
                        {rev.verifiedPurchase && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-numbers bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                        {rev.userCity} · {rev.createdAt}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating 
                            ? 'fill-current text-amber-500' 
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-xs text-[#09090B] dark:text-[#F8FAFC] font-body leading-relaxed">
                  {rev.comment}
                </p>

                {/* Helpful vote action */}
                <div className="flex items-center justify-between pt-1 border-t border-[#E4E4E7] dark:border-[#22242F] text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                  <span className="text-[10px]">Was this review helpful?</span>
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(rev.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      hasVoted
                        ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10'
                        : 'hover:text-[#09090B] dark:hover:text-[#F8FAFC]'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({currentCount})</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
