import React, { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";

const App = () => {
  // tree data //
  const [treeData, setTreeData] = useState([
    {
      id: "1",
      text: "",
      diamond: false,
      children: [],
    },
  ]);

  const [value, setValue] = useState({});

  const [editAction, setEditAction] = useState({});
  const [globalAdd, setGlobalAdd] = useState(false);

  // handle add tree child //

  const handleAddChild = (parent, customId, text, diamond) => {
    const newChild = {
      id: customId || Date.now().toString(),
      text: text || "",
      diamond: diamond || false,
      children: [],
    };
    if (!treeData.length) {
      setTreeData([newChild]);
    } else {
      parent.children.push(newChild);
      setTreeData([...treeData]);
    }
  };

  //  handle delete tree child //

  const handleDeleteChild = (nodeId) => {
    const parent = findParents(treeData, nodeId);
    if (!parent) {
      return setTreeData([]);
    }
    const index = parent.children.findIndex((child) => child.id === nodeId);
    if (index === -1) {
      return;
    }
    parent.children.splice(index, 1);
    setTreeData([...treeData]);
  };

  //  find a element in object with id //

  const findParents = (tree, id) => {
    const treeData = [...tree];
    while (treeData.length > 0) {
      // remove frst item of array each time
      const current = treeData.shift();
      for (let i = 0; i < (current.children?.length || 0); i++) {
        if (current.children[i].id === id) {
          return current;
        }
        treeData.push(current.children[i]);
      }
    }
    return null;
  };

  const handleEditChild = (id, data) => {
    setEditAction(id);
    const current = document.getElementById(id);
    current.innerHTML = data;
  };

  useEffect(() => {
    if (!treeData.length) {
      setGlobalAdd(true);
      console.log("khali ast");
    } else {
      setGlobalAdd(false);
      console.log("por ast");
    }
  }, [treeData]);

  // return a tree with recursion

  const treeRendering = (treeData) => {
    return (
      <>
        <ul className="w-[100%] h-screen ">
          {treeData &&
            treeData.map((item) => (
              <>
                <li key={item.id}>
                  <div id={item.id} className="">
                    {item.id}
                  </div>
                  <span className="flex gap-x-1 justify-center items-center my-1">
                    <BsFillPlusCircleFill
                      className="text-green-400  text-2xl cursor-pointer "
                      onClick={() => handleAddChild(item)}
                    />
                    <MdDelete
                      className="text-red-500  text-2xl cursor-pointer"
                      onClick={() => handleDeleteChild(item.id)}
                    />
                    {item.id != editAction ? (
                      <AiTwotoneEdit
                        className="text-yellow-400  text-2xl cursor-pointer"
                        onClick={() =>
                          handleEditChild(item.id, value[item.id] || item.id)
                        }
                      />
                    ) : (
                      <BsFillPlusCircleFill
                        className="text-yellow-400  text-2xl cursor-pointer "
                        onClick={() =>
                          handleEditChild(item.id, value[item.id] || item.id)
                        }
                      />
                    )}

                    {item.id === editAction && (
                      <input
                        placeholder="set a name "
                        type="text"
                        className={` outline-none border-[1px] border-gray-300 rounded-md my-2 pl-2 mr-12`}
                        onChange={(e) =>
                          setValue({ [item.id]: e.target.value })
                        }
                      />
                    )}
                  </span>

                  {item.children && item.children.length
                    ? treeRendering(item.children)
                    : " "}
                </li>
              </>
            ))}
        </ul>
      </>
    );
  };

  return (
    <div className="tree ">
      {globalAdd && (
        <div className="flex   mt-12 justify-center ">
          <button
            className=" p-4 z-50 bg-red-500 rounded-lg text-white font-bold hover:bg-white border-[1px] border-red-500
             hover:text-red-500 transition-all duration-100"
            onClick={handleAddChild}
          >
            create tree
          </button>
        </div>
      )}

      {treeRendering(treeData)}
    </div>
  );
};

export default App;
