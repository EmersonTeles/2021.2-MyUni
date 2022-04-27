import {forwardRef, useImperativeHandle, useState} from "react";
import {XIcon} from "@heroicons/react/outline";
import Modal from "../modal";
import "./styles.scss";
import ForumTopic from "../forumTopic";

function ForumModal({ forum }, ref) {
    const [forumModal, setForumModal] = useState(false);
    const [values, setValues] = useState(null);
    function handleChange(event) {
      const { name, value } = event.target;
  
      setValues({ ...values, [name]: value });
    }
    useImperativeHandle(ref, () => ({
      handleOpenModal: (forum) => {
        setValues(forum);
        console.log("imperative");
        setForumModal(true);
      },
    }));
  
    if (!forumModal) return null;
  
    return (
      <Modal>
        <div className="forumModalContainer">
          <article className="forumModal">
            <button
              className="forumModal_close_button"
              onClick={() => setForumModal(false)}
            >
              <XIcon />
            </button>
            <div class="forumModal_content">
              <div className="question">
                <header className="forumModal_content_header">
                  <h1>{values.title}</h1>
                </header>
                <main className="forumModal_content_main">
                  <p>{values.description}</p>
                </main>
              </div>
              <div className="forumModal_responses">
                  {
                      values.responses?.map((resposta)=> {
                          return <ForumTopic description={resposta.description} user={resposta.autor}/>
                      })
                  }
              </div>
            </div>
          </article>
        </div>
      </Modal>
    );
  }
  
  export default forwardRef(ForumModal);
  