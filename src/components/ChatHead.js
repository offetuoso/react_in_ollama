function ChatHead() {


  return (
    <>
      <div className="menu">
        <div className="items"><span>
          <a href="#" title="Minimize">&mdash;</a><br/>
          <a href="#" title="End Chat">&#10005;</a>
          
          </span>
        </div>
        {/* <div className="button hide">...</div> */}
      </div>
      <div className="agent-face">
        <div className="half">
          <img className="agent oval" src="https://ollama.com/public/ollama.png" alt="Ollama" />
        </div>
      </div>
   </>
  );
}

export default ChatHead;
