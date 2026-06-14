import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationControls({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded border border-border bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:hover:text-muted-foreground transition-colors flex items-center justify-center"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={15} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded text-sm transition-colors ${
            currentPage === page
              ? "bg-primary text-primary-foreground font-medium"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded border border-border bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:hover:text-muted-foreground transition-colors flex items-center justify-center"
        aria-label="다음 페이지"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
