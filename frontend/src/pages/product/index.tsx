import { CanSSRAuth } from "@/utils/CanSSRAuth";
import { useState } from "react";
import Head from "next/head";
import styles from "./style.module.scss";
import { Header } from "@/components/ui/Header";
import { setupAPIClient } from "../../services/api";
import { FiEdit, FiFilter, FiPlus, FiTrash } from "react-icons/fi";
import { FcLeave } from "react-icons/fc";
import { BiSolidReport } from "react-icons/bi";
import { ModalDescontinue } from "@/components/uiProduct/ModalDescontinue";

import pdfMake from "pdfmake/build/pdfmake";

import pdfFonts from "pdfmake/build/vfs_fonts";

import Link from "next/link";
import { api } from "@/services/apiClient";
import { Footer } from "@/components/ui/Footer";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import PdfPrinter from "pdfmake";
import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import { blob } from "stream/consumers";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export type ItemProductProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  category_id: string;
  estimated_time: string;
  category: {
    id: string;
    name: string;
  };
};

interface ProductProps {
  productList: ItemProductProps[];
  categoryList: ItemCategoryProps[];
}

type ItemCategoryProps = {
  id: string;
  name: string;
};

export default function Product({ productList, categoryList }: ProductProps) {
  const [modalProduct, setModalProduct] = useState<ItemProductProps[]>();
  const [products, setProducts] = useState(productList || []);
  const [categories, setCategories] = useState(categoryList || []);
  const [imageUrl, setImageUrl] = useState("http://localhost:2627/files/");

  const [modalVisible, setModalVisible] = useState(false);

  async function handleReport() {
    try {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/users/list")

      const date = new Date().toLocaleString();

      const body = [];

      const columnsTitle: TableCell[] = [
        { text: "Name", style: "name" },
        { text: "Descrição", style: "columnsTitle" },
        { text: "Preço", style: "columnsTitle" },
        { text: "Tempo de Preparo", style: "columnsTitle" },
      ];

      const columnsBody = new Array();

      columnsTitle.forEach((column) => columnsBody.push(column));
      body.push(columnsBody);

      for await (let product of products) {
        const rows = new Array();

        rows.push(product.name);
        rows.push(product.description);
        rows.push(`R$ ${Number(product.price.toString()).toFixed(2)}`);
        rows.push(product.estimated_time);

        body.push(rows);
      }

      const docDefinitions: TDocumentDefinitions = {
        content: [
          {
            columns: [
              { text: "Relatório de Produtos", style: "header" },
              { text: date + "\n\n", style: "header" },
            ],
          },
          {
            table: {
              headerRows: 1,
              widths: [130, "auto", 80, "auto"],

              body,
            },
          },
        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
          },
          columnsTitle: {
            fontSize: 13,
            bold: true,
            fillColor: "#7159c1",
            color: "#FFF",
            alignment: "center",
            margin: 4,
          },
          name: {
            fillColor: "#999",
            color: "#FFF",
            alignment: "center",
            margin: 4,
          },
        },
      };

      const pdfgenerator = pdfMake.createPdf(docDefinitions);

      pdfgenerator.download();
    } catch (error) {
      toast.error("Permissão Negada");
    }
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(category_id: string, product_id: string) {
    const apiClient = setupAPIClient();

    const response = await apiClient.get("/product/list", {
      params: {
        category_id: category_id,
        id: product_id,
      },
    });

    setModalProduct(response.data);
    setModalVisible(true);

  }

  async function handleDescontinue(id: string) {

    const apiClient = setupAPIClient();

    try {
      const response = await apiClient.get("/product/list",{
        params:{
          id: id,
          stock: 'true'
        }
      });

      setModalVisible(false);

      toast.success("Produto descontinuado com sucesso");
    } catch (error) {
      toast.error("erro");
    }
  }

  async function handleChangeCategory(event) {
    const apiClient = setupAPIClient();

    if (event.target.value === "Tudo") {
      const response = await apiClient.get("/product/list", {
        params:{
          stock: 'true'
        }
      });
      setProducts(response.data);
    }
    for (let x = 0; x < categories.length; x++) {
      if (categories[x].name === event.target.value) {
        const response = await apiClient.get("/product/list", {
          params: {
            category_id: categories[x].id,
            stock: 'true'
          },
        });
        setProducts(response.data);
      }
    }
  }

  if (productList) {
    return (
      <>
        <Head>
          <title>Listar Produtos - Express Waiter</title>
        </Head>
        <div>
          <Header />
          <main className={styles.container}>
            <div className={styles.containerHead}>
              <h1>Produtos</h1>
              <div className={styles.filter}>
                <FiFilter size={30} />
                <select onChange={handleChangeCategory}>
                  <option key={"#"}>Tudo</option>
                  {categories.map((item, index) => {
                    return <option key={item.id}>{item.name}</option>;
                  })}
                </select>
              </div>

              <div>
                <button title="Cadastrar Produto" className={styles.button}>
                  <Link href="/product/create" legacyBehavior>
                    <a>
                      <FiPlus size={50} />
                    </a>
                  </Link>
                </button>
                <button
                  title="Gerar Relatório"
                  className={styles.button}
                  onClick={handleReport}
                >
                  <a>
                    <BiSolidReport size={45} color="#fddc8f" />
                  </a>
                </button>
              </div>
            </div>
            {products.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum produto foi encontrado...
              </span>
            )}
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th className={styles.headNomeDescrição}>
                      Nome e Descrição
                    </th>
                    <th className={styles.headActive}>Ativo</th>
                    <th className={styles.headPrice}>Preço</th>
                    <th className={styles.headPrepared}>Preparo</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => {
                    const price: number = item.price;
                    return (
                      <tr key={item.id} className={styles.tr}>
                        <td>
                          <img
                            className={styles.image}
                            src={imageUrl + item.banner}
                            alt="Imagem do produto"
                            width={250}
                            height={250}
                          />
                        </td>
                        <td className={styles.nameDescription}>
                          <span className={styles.name}>{item.name}</span>
                          <span>{item.description}</span>
                        </td>

                        <td className={styles.active}>{"-"}</td>
                        <td className={styles.price}>
                          R$ {Number(price).toFixed(2)}
                        </td>
                        <td className={styles.prepared}>
                          {item.estimated_time || "-"}
                        </td>
                        <td className={styles.acao}>
                          <button title="Editar" className={styles.button}>
                            <a href="/product/create">
                              {" "}
                              <FiEdit size={24} color="#D9D910" />
                            </a>
                          </button>
                          <button
                            title="Descontinuar"
                            className={styles.button}
                            onClick={() =>
                              handleOpenModalView(item.category_id, item.id)
                            }
                          >
                            <a>
                              <FcLeave size={24} color="#FF3F4B" />
                            </a>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <span className={styles.total}>Total: {products.length}</span>
          </main>

          {modalVisible && (
            <ModalDescontinue
              isOpen={modalVisible}
              onRequestClose={handleCloseModal}
              item={modalProduct}
              handleDescontinue={handleDescontinue}
            />
          )}
          <Footer />
        </div>
      </>
    );
  } else {
    return history.go(-1), toast.error("Permissão Negada");
  }
}

export const getServerSideProps = CanSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const responseProducts = await apiClient
    .get("/product/list",{
      params:{
        stock: 'true'
      }
    })
    .catch((error) => {
      if (error.responseProducts) {
        return error.responseProducts;
      }
    });
  const responseCategories = await apiClient.get("/listcategory");


  return {
    props: {
      productList: responseProducts.data,
      categoryList: responseCategories.data,
    },
  };
});
