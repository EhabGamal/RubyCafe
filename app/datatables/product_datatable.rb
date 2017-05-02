class ProductDatatable < AjaxDatatablesRails::Base

  # or define them in one pass
  def_delegators :@view, :link_to, :h, :mailto, :edit_product_path

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= [
        'Product.id',
        'Product.name',
        'Product.description'
    ]
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= [
        'Product.name',
        'Product.description'
    ]
  end
  def edit_product_path(record)
    record.name
  end

  private

  def data
    records.map do |record|
      [
          # comma separated list of the values for each cell of a table row
          # example: record.attribute,
          record.id,
          record.name,
          record.description,
          record.price,
          record.available,
          record.category.name,
          edit_product_path(record)
      ]
    end
  end

  def get_raw_records
    # insert query here
    Product.all
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
