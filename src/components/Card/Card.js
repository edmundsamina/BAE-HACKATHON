import React from "react";

export default function Card() {
  return (
    <div class="card w-96 h-96 bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Card title!</h2>

        <div class="card-actions justify-end">
          <button class="btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
