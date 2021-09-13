type MyNode = BSTNode | null;

class BSTNode {
  value: number;
  left: MyNode;
  right: MyNode;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  private root: MyNode;
  constructor() {
    this.root = null;
  }

  private insertValueRecursively = (node: MyNode, valueToInsert: number) => {
    if (node === null) {
      this.root = new BSTNode(valueToInsert);
      return this.root;
    } else if (node.value < valueToInsert) {
      if (node.right === null) {
        node.right = new BSTNode(valueToInsert);
        return node.right;
      } else {
        this.insertValueRecursively(node.right, valueToInsert);
      }
    } else if (node.value > valueToInsert) {
      if (node.left === null) {
        node.left = new BSTNode(valueToInsert);
        return node.left;
      } else {
        this.insertValueRecursively(node.left, valueToInsert);
      }
    }

    return null;
  };

  private searchRecursively = (
    node: MyNode,
    valueToSearch: number
  ): BSTNode | null => {
    if (node === null) {
      return null;
    } else if (node.value === valueToSearch) {
      return node;
    } else if (node.value < valueToSearch) {
      return this.searchRecursively(node.right, valueToSearch);
    } else if (node.value > valueToSearch) {
      return this.searchRecursively(node.left, valueToSearch);
    }
    return null;
  };

  findMinNodeRecursively = (node: BSTNode): BSTNode => {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNodeRecursively(node.left);
    }
  };

  private removeNodeRecursively = (node: MyNode, valueToRemove: number) => {
    if (node === null) {
      return null;
    } else if (node.value === valueToRemove) {
      if (node.left === null && node.right === null) {
        node = null;

        return node;
      } else if (
        (node.left === null && node.right !== null) ||
        (node.right === null && node.left !== null)
      ) {
        const tempNode = node.left || node.right;

        node = null;

        return tempNode;
      } else {
        if (node.right) {
          const minNodeInRightSubtree = this.findMinNodeRecursively(node.right);
          node.value = minNodeInRightSubtree.value;
          node.right = this.removeNodeRecursively(
            node.right,
            minNodeInRightSubtree.value
          );
          return node;
        }
      }
    } else if (node.value < valueToRemove) {
      node.right = this.removeNodeRecursively(node.right, valueToRemove);

      return node;
    } else if (node.value > valueToRemove) {
      node.left = this.removeNodeRecursively(node.left, valueToRemove);

      return node;
    }

    return null;
  };

  insert(valueToInsert: number) {
    return this.insertValueRecursively(this.root, valueToInsert);
  }

  search(valueToSearch: number) {
    return this.searchRecursively(this.root, valueToSearch);
  }

  remove(valueToRemove: number) {
    return this.removeNodeRecursively(this.root, valueToRemove);
  }

  inorder(node: MyNode) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.value);
      this.inorder(node.right);
    }
  }

  preorder(node: MyNode) {
    if (node !== null) {
      console.log(node.value);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  postorder(node: MyNode) {
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.value);
    }
  }

  getRootNode(): MyNode {
    return this.root;
  }
}

const bst = new BST();
bst.insert(90);
bst.insert(50);
bst.insert(100);
bst.insert(40);
bst.insert(60);
bst.insert(120);
bst.insert(130);

// console.log("Search:",bst.getRootNode());
// console.log('Search:', bst.search(100));
console.log('Remove:', bst.remove(90));
// console.log('Search:', bst.search(120));
// const rootNode = bst.getRootNode();
// if (rootNode) {
//   if (rootNode.left) {
//     console.log('Inorder:', bst.findMinNodeRecursively(rootNode.left));
//   }
// }
console.log('Root:', bst.getRootNode());
