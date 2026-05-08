"use client";

import { useState } from "react";
import { useAuth } from "@/hooks";
import {
  useReviews,
  useReviewSummary,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from "@/hooks";
import type { Review } from "@/services/reviews";
import styles from "./ReviewsSection.module.css";

// ─── Star components ──────────────────────────────────────────────────────────

function FilledStar({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="#f59e0b">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function EmptyStar({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="#d1d5db"
      strokeWidth="1.5"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRow({
  rating,
  size = 16,
  interactive = false,
  onRate,
}: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className={styles.starRow}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onClick={() => interactive && onRate?.(n)}
          onMouseEnter={() => interactive && setHovered(n)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{ cursor: interactive ? "pointer" : "default" }}
        >
          {n <= (interactive && hovered ? hovered : rating) ? (
            <FilledStar size={size} />
          ) : (
            <EmptyStar size={size} />
          )}
        </span>
      ))}
    </div>
  );
}

// ─── Rating Summary Bar ───────────────────────────────────────────────────────

function RatingSummary({
  productId,
}: {
  productId: string;
}) {
  const { data: summary, isLoading } = useReviewSummary(productId);

  if (isLoading) return <div className={styles.summaryShimmer} />;
  if (!summary) return null;

  const dist = summary.distribution as Record<number, number>;

  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryScore}>
        <span className={styles.bigRating}>
          {summary.averageRating.toFixed(1)}
        </span>
        <StarRow rating={Math.round(summary.averageRating)} size={20} />
        <span className={styles.reviewCount}>
          {summary.reviewCount} review{summary.reviewCount !== 1 ? "s" : ""}
        </span>
      </div>
      <div className={styles.summaryBars}>
        {[5, 4, 3, 2, 1].map((star) => {
          const count = dist[star] || 0;
          const pct =
            summary.reviewCount > 0
              ? Math.round((count / summary.reviewCount) * 100)
              : 0;
          return (
            <div key={star} className={styles.barRow}>
              <span className={styles.barLabel}>{star} ★</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className={styles.barCount}>{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Review Form ──────────────────────────────────────────────────────────────

interface FormState {
  rating: number;
  title: string;
  comment: string;
}

function ReviewForm({
  productId,
  initial,
  reviewId,
  onCancel,
}: {
  productId: string;
  initial?: FormState;
  reviewId?: string;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<FormState>(
    initial ?? { rating: 0, title: "", comment: "" },
  );

  const createMutation = useCreateReview(productId);
  const updateMutation = useUpdateReview(productId);
  const isEditing = !!reviewId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) return;
    const payload = {
      rating: form.rating,
      title: form.title || undefined,
      comment: form.comment,
    };
    if (isEditing) {
      updateMutation.mutate(
        { reviewId: reviewId!, payload },
        { onSuccess: onCancel },
      );
    } else {
      createMutation.mutate(payload, { onSuccess: onCancel });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4 className={styles.formTitle}>
        {isEditing ? "Edit your review" : "Write a review"}
      </h4>

      {/* Rating picker */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Your rating *</label>
        <StarRow
          rating={form.rating}
          size={28}
          interactive
          onRate={(r) => setForm((f) => ({ ...f, rating: r }))}
        />
        {form.rating === 0 && (
          <span className={styles.hint}>Click to select a rating</span>
        )}
      </div>

      {/* Title */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Title (optional)</label>
        <input
          className={styles.input}
          type="text"
          maxLength={120}
          placeholder="Summarise your experience"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
      </div>

      {/* Comment */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Comment *</label>
        <textarea
          className={styles.textarea}
          rows={4}
          minLength={5}
          maxLength={2000}
          placeholder="Share your experience with this product…"
          value={form.comment}
          required
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
        />
      </div>

      <div className={styles.formActions}>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isPending || form.rating === 0}
        >
          {isPending ? "Saving…" : isEditing ? "Update review" : "Submit review"}
        </button>
      </div>
    </form>
  );
}

// ─── Review Row (table row) ───────────────────────────────────────────────────

function ReviewRow({
  review,
  currentUserId,
  productId,
}: {
  review: Review;
  currentUserId?: string;
  productId: string;
}) {
  const [editing, setEditing] = useState(false);
  const deleteMutation = useDeleteReview(productId);
  const isOwner = currentUserId && String(review.user._id) === currentUserId;

  const initials = review.user.name
    ? review.user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (editing) {
    return (
      <tr className={styles.editRow}>
        <td colSpan={5}>
          <ReviewForm
            productId={productId}
            reviewId={review._id}
            initial={{
              rating: review.rating,
              title: review.title || "",
              comment: review.comment,
            }}
            onCancel={() => setEditing(false)}
          />
        </td>
      </tr>
    );
  }

  return (
    <tr className={styles.tableRow}>
      {/* Reviewer */}
      <td className={styles.cell}>
        <div className={styles.reviewer}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <div className={styles.reviewerName}>{review.user.name}</div>
            {review.isVerifiedPurchase && (
              <span className={styles.verified}>✓ Verified</span>
            )}
          </div>
        </div>
      </td>

      {/* Rating */}
      <td className={styles.cell}>
        <StarRow rating={review.rating} />
      </td>

      {/* Title + Comment */}
      <td className={styles.cell}>
        {review.title && (
          <div className={styles.reviewTitle}>{review.title}</div>
        )}
        <div className={styles.reviewComment}>{review.comment}</div>
      </td>

      {/* Date */}
      <td className={styles.cell}>
        <span className={styles.date}>{date}</span>
      </td>

      {/* Actions */}
      <td className={styles.cell}>
        {isOwner && (
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className={styles.deleteBtn}
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate(review._id)}
            >
              {deleteMutation.isPending ? "…" : "Delete"}
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

// ─── Reviews Table ────────────────────────────────────────────────────────────

function ReviewsTable({
  productId,
  currentUserId,
}: {
  productId: string;
  currentUserId?: string;
}) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useReviews(productId, {
    page,
    limit: 8,
  });

  if (isLoading) return <div className={styles.loading}>Loading reviews…</div>;
  if (isError)
    return (
      <div className={styles.error}>Failed to load reviews. Try again.</div>
    );
  if (!data || data.data.length === 0)
    return (
      <div className={styles.empty}>
        <span>🌟</span>
        <p>No reviews yet — be the first to review this product!</p>
      </div>
    );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Reviewer</th>
            <th className={styles.th}>Rating</th>
            <th className={styles.th}>Comment</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((review) => (
            <ReviewRow
              key={review._id}
              review={review}
              currentUserId={currentUserId}
              productId={productId}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Prev
          </button>
          <span className={styles.pageInfo}>
            Page {data.page} of {data.totalPages}
          </span>
          <button
            className={styles.pageBtn}
            disabled={page === data.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ReviewsSection({ productId }: { productId: string }) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  return (
    <section className={styles.section} id="reviews">
      <div className={styles.header}>
        <h3 className={styles.sectionTitle}>Customer Reviews</h3>
        {user && !showForm && (
          <button
            className={styles.writeBtn}
            onClick={() => setShowForm(true)}
            id="write-review-btn"
          >
            + Write a Review
          </button>
        )}
        {!user && (
          <a href="/login" className={styles.loginPrompt}>
            Sign in to leave a review
          </a>
        )}
      </div>

      {/* Rating summary */}
      <RatingSummary productId={productId} />

      {/* Write review form */}
      {showForm && user && (
        <div className={styles.formWrapper}>
          <ReviewForm
            productId={productId}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Reviews table */}
      <ReviewsTable
        productId={productId}
        currentUserId={user?._id as string | undefined}
      />
    </section>
  );
}
