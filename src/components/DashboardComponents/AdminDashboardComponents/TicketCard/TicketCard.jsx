const TicketCard = ({ count, name, progress, icon }) => {
  return (
    <div className="card bg-base-100 w-full max-w-md shadow-xl">
      <div className="card-body">
        <div className="flex gap-5">
         <p className="text-3xl text-indigo-600">{icon}</p>
          <h2 className="card-title font-bold text-2xl flex-1 text-pink-400">{count?.length}</h2>
          {/* <button className="btn btn-primary">Buy Now</button> */}
        </div>
        <div>
          <p className="text-gray-gray4">{name}</p>
        </div>
        {/* <div className="">
          <progress
            class="progress progress-secondary w-56"
            value="70"
            max="100"
          />
          70%
        </div> */}
      </div>
    </div>
  );
};

export default TicketCard;
